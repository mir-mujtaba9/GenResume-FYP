// models/profile.js
const mongoose = require('mongoose');

// Define the Profile schema
const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',  // Ensure this references the correct User model name
        required: true,
        unique: true // Each user should have only one profile
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true // Made required to match Zod schema
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique across profiles
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Optional: Basic email format validation
    },
    workExperience: [{ // Array of work experiences
        jobTitle: String,
        company: String,
        startDate: Date, // Changed from 'date: String'
        endDate: Date,   // Changed from 'date: String'
        responsibilities: String
        // Mongoose adds _id to subdocuments by default, which is fine
    }],
    education: [{ // Array of education entries
        degree: String,
        institution: String,
        graduationYear: String // Keeping as String as decided
        // Mongoose adds _id to subdocuments by default
    }],
    skills: {
        type: String,
        required: true // Made required to match Zod schema
    },
    certifications: { // Optional field
        type: String
    },
    achievements: { // Optional field
        type: String
    },
    languages: { // Optional field
        type: String
    },
    projects: { // Optional field (matching updated Zod)
        type: String
    }
}, {
    timestamps: true // Optional: Adds createdAt and updatedAt timestamps
});

// Create a Profile model from the schema
const Profile = mongoose.model('Profile', profileSchema);

// Export the Profile model
module.exports = Profile;