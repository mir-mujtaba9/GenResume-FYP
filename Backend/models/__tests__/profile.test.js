const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Profile = require('../profile'); // Adjust path if your models folder is elsewhere
const User = require('../user'); // We'll need this to create a valid userId for tests

let mongoServer;

// Helper function to create a dummy user for profile's userId reference
const createDummyUser = async () => {
    const user = new User({ username: `testuser_${Date.now()}`, password: 'password123' });
    return await user.save();
};

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// Clear all data after each test to ensure test independence
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

describe('Profile Model', () => {
    let validUserId;

    beforeEach(async () => {
        // Create a fresh user for each test that needs a userId
        const dummyUser = await createDummyUser();
        validUserId = dummyUser._id;
    });

    // Test for successful profile creation
    it('should create and save a profile successfully with all required fields', async () => {
        const profileData = {
            userId: validUserId,
            name: 'Sarmad Shakeel',
            phone: '1234567890',
            email: 'sarmad.profile@example.com',
            skills: 'React, Node, Testing',
            workExperience: [{ jobTitle: 'Dev', company: 'Tech Co' }],
            education: [{ degree: 'CS', institution: 'Uni X' }],
            // Optional fields
            certifications: 'Certified Tester',
            achievements: 'Top Performer',
            languages: 'English',
            projects: 'My awesome project details or link'
        };
        const profile = new Profile(profileData);
        const savedProfile = await profile.save();

        expect(savedProfile._id).toBeDefined();
        expect(savedProfile.userId).toEqual(profileData.userId);
        expect(savedProfile.name).toBe(profileData.name);
        expect(savedProfile.email).toBe(profileData.email);
        expect(savedProfile.phone).toBe(profileData.phone);
        expect(savedProfile.skills).toBe(profileData.skills);
        expect(savedProfile.workExperience.length).toBe(1);
        expect(savedProfile.workExperience[0].jobTitle).toBe('Dev');
        expect(savedProfile.education.length).toBe(1);
        expect(savedProfile.education[0].degree).toBe('CS');
        expect(savedProfile.certifications).toBe(profileData.certifications);
        expect(savedProfile.achievements).toBe(profileData.achievements);
        expect(savedProfile.languages).toBe(profileData.languages);
        expect(savedProfile.projects).toBe(profileData.projects);
        expect(savedProfile.createdAt).toBeDefined();
        expect(savedProfile.updatedAt).toBeDefined();
    });

    // Test required fields
    const requiredFields = ['userId', 'name', 'phone', 'email', 'skills'];
    requiredFields.forEach((field) => {
        it(`should require a ${field} field`, async () => {
            const profileData = {
                userId: validUserId,
                name: 'Test Name',
                phone: '0987654321',
                email: 'test.email@example.com',
                skills: 'Testing skills',
            };
            delete profileData[field]; // Remove the field to be tested

            // If we are testing userId, we need a different approach as it's required for the object
            if (field === 'userId') {
                profileData.userId = null; // or undefined
            }

            const profile = new Profile(profileData);
            let err;
            try {
                await profile.save();
            } catch (error) {
                err = error;
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            // For userId, Mongoose might not put it directly in errors[field] if it's null
            // but it will still be a validation error.
            if (err && err.errors) {
                expect(err.errors[field]).toBeDefined();
            }
        });
    });

    // Test email validation
    it('should accept a valid email format', async () => {
        const profileData = {
            userId: validUserId,
            name: 'Valid Email User',
            phone: '1112223333',
            email: 'valid.email@example.com',
            skills: 'Email testing',
        };
        const profile = new Profile(profileData);
        await expect(profile.save()).resolves.toBeDefined();
    });

    it('should reject an invalid email format', async () => {
        const profileData = {
            userId: validUserId,
            name: 'Invalid Email User',
            phone: '1112223333',
            email: 'invalid-email-format',
            skills: 'Email testing',
        };
        const profile = new Profile(profileData);
        let err;
        try {
            await profile.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
        expect(err.errors.email.message).toBe('Please fill a valid email address');
    });

    // Test uniqueness for userId
    it('should enforce unique userId', async () => {
        // First profile with validUserId is already created in beforeEach or prior tests
        // (or create one specifically if afterEach clears everything)
        await new Profile({
            userId: validUserId,
            name: 'First User Profile',
            phone: '12345',
            email: 'first.user.profile@example.com',
            skills: 'Unique skills 1'
        }).save();

        const duplicateProfileData = {
            userId: validUserId, // Same userId
            name: 'Duplicate UserID Profile',
            phone: '67890',
            email: 'duplicate.userid.profile@example.com', // Different email
            skills: 'Some other skills',
        };
        const duplicateProfile = new Profile(duplicateProfileData);
        let err;
        try {
            await duplicateProfile.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
        // MongoDB duplicate key error code is 11000
        // For Mongoose, it often wraps this in a custom error object.
        // Checking for err.code or a message containing "duplicate key" is common.
        expect(err.code).toBe(11000);
    });

    // Test uniqueness for email
    it('should enforce unique email', async () => {
        const commonEmail = 'unique.profile.email@example.com';
        await new Profile({
            userId: validUserId, // validUserId is unique for this test run due to beforeEach
            name: 'First Email Profile',
            phone: '1234500',
            email: commonEmail,
            skills: 'Unique email skills 1'
        }).save();

        // Create a new user for the second profile to ensure userId is different
        const anotherUser = await createDummyUser();

        const duplicateEmailProfileData = {
            userId: anotherUser._id, // Different userId
            name: 'Duplicate Email Profile',
            phone: '6789000',
            email: commonEmail, // Same email
            skills: 'Some other email skills',
        };
        const duplicateEmailProfile = new Profile(duplicateEmailProfileData);
        let err;
        try {
            await duplicateEmailProfile.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
        expect(err.code).toBe(11000);
    });

    // Test optional fields can be saved if provided
    it('should save optional fields if provided', async () => {
        const profileData = {
            userId: validUserId,
            name: 'Optional Fields User',
            phone: '5555555555',
            email: 'optional.fields@example.com',
            skills: 'Core skills',
            certifications: 'My Cert',
            achievements: 'My Achievement',
            languages: 'Klingon',
            projects: 'Side Project X'
        };
        const profile = new Profile(profileData);
        const savedProfile = await profile.save();
        expect(savedProfile.certifications).toBe('My Cert');
        expect(savedProfile.achievements).toBe('My Achievement');
        expect(savedProfile.languages).toBe('Klingon');
        expect(savedProfile.projects).toBe('Side Project X');
    });

    // Test that optional fields are not required (i.e., undefined if not provided)
    it('should have undefined for optional fields if not provided', async () => {
        const profileData = {
            userId: validUserId,
            name: 'Minimal User',
            phone: '1212121212',
            email: 'minimal.user@example.com',
            skills: 'Minimal skills',
            // certifications, achievements, languages, projects are omitted
        };
        const profile = new Profile(profileData);
        const savedProfile = await profile.save();
        expect(savedProfile.certifications).toBeUndefined();
        expect(savedProfile.achievements).toBeUndefined();
        expect(savedProfile.languages).toBeUndefined();
        expect(savedProfile.projects).toBeUndefined();
    });

});