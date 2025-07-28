const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server'); // Import your Express app from server.js
const User = require('../../models/user'); // Adjust path as per your structure

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    // Ensure Mongoose uses the in-memory server for tests
    // This might require temporarily overriding process.env.MONGODB_URI if server.js connects immediately
    // Or, ensure your server.js mongoose.connect uses a URI that can be set by tests
    // For simplicity, if your server.js directly connects, this test setup assumes
    // that connection will be overridden or that it won't interfere.
    // A robust setup often involves a separate DB connection logic for tests.
    await mongoose.connect(mongoUri);

    // It's crucial that JWT_SECRET is set in your test environment.
    // If your server.js uses dotenv.config(), it should pick up your .env file.
    // Ensure .env has JWT_SECRET or set it via script: e.g., "test": "JWT_SECRET=yourtestsecret jest"
    if (!process.env.JWT_SECRET) {
        // Provide a default for testing if not set, but warn
        console.warn('JWT_SECRET not set in environment, using a default for testing. THIS IS NOT SECURE FOR PRODUCTION.');
        process.env.JWT_SECRET = 'test_secret_key_for_jwt_testing_only_12345';
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// Clear the User collection before each test
beforeEach(async () => {
    await User.deleteMany({});
});

describe('Auth API Endpoints', () => {
    // --- Registration Tests (/api/register) ---
    describe('POST /api/register', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/register')
                .send({
                    username: 'testuser',
                    password: 'Password123!',
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('message', 'User registered successfully');

            // Optionally, check if the user was actually saved in the DB and password hashed
            const userInDb = await User.findOne({ username: 'testuser' });
            expect(userInDb).not.toBeNull();
            expect(userInDb.password).not.toEqual('Password123!'); // Check it's hashed
        });

        it('should return 400 if username is missing', async () => {
            const res = await request(app)
                .post('/api/register')
                .send({
                    password: 'Password123!',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('message', 'Username and password are required.');
        });

        it('should return 400 if password is missing', async () => {
            const res = await request(app)
                .post('/api/register')
                .send({
                    username: 'anotheruser',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('message', 'Username and password are required.');
        });

        it('should return 400 if username already exists', async () => {
            // First, register a user
            await request(app)
                .post('/api/register')
                .send({
                    username: 'existinguser',
                    password: 'Password123!',
                });

            // Then, try to register the same user again
            const res = await request(app)
                .post('/api/register')
                .send({
                    username: 'existinguser',
                    password: 'AnotherPassword123!',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('message', 'User already exists');
        });
    });

    // --- Login Tests (/api/login) ---
    describe('POST /api/login', () => {
        beforeEach(async () => {
            // Create a user to log in with
            const user = new User({ username: 'loginuser', password: 'Password123!' });
            await user.save(); // Password will be hashed by pre-save hook
        });

        it('should login an existing user successfully and return a token', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    username: 'loginuser',
                    password: 'Password123!',
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('message', 'Login successful!');
            expect(res.body).toHaveProperty('token'); // Check if token exists
            expect(typeof res.body.token).toBe('string'); // Check if token is a string
        });

        it('should return 404 if user not found', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    username: 'nonexistentuser',
                    password: 'Password123!',
                });
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('message', 'User not found');
        });

        it('should return 400 for invalid credentials (wrong password)', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    username: 'loginuser',
                    password: 'WrongPassword!',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('message', 'Invalid credentials');
        });

        it('should return 400 if username is missing on login', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    password: 'Password123!',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('message', 'Username and password are required.');
        });

        it('should return 400 if password is missing on login', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    username: 'loginuser',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('message', 'Username and password are required.');
        });
    });
});