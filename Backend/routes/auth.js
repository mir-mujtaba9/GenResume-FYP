// routes/auth.js
const express = require('express');
const User = require('../models/user');
const Profile = require('../models/profile'); // Import Profile model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate.js'); // Import authentication middleware
const router = express.Router();
// const mongoose = require('mongoose'); // Not strictly needed here unless using specific mongoose static methods

// --- User Registration ---
router.post('/register', async (req, res) => {
    console.log('Registration request received:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('User already exists:', username);
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        console.log('User registered successfully:', newUser.username);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// --- User Login ---
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username);

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('Login failed: User not found - ', username);
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Login failed: Invalid credentials for - ', username);
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate token (expires in 1 hour, adjust as needed)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful, token generated for - ', username);

        // --- Token Strategy: Send token in response body (matches current frontend) ---
        // Removed the res.cookie part
        res.json({ success: true, message: 'Login successful!', token }); // Send token in body

    } catch (error) {
        console.error('Login server error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});


// --- Profile Create/Update (Upsert) ---
// Uses POST for both creation and replacement (PUT-like behavior via replaceOne)
router.post('/profiles', authenticate, async (req, res) => {
    console.log(`Profile POST request received for userId: ${req.userId}`);
    const {
        name, phone, email, workExperience, education, skills,
        certifications, achievements, languages, projects // Optional fields
    } = req.body;

    // --- Server-Side Validation (Aligned with updated Mongoose Schema) ---
    // Required Fields Check
    if (!name || !phone || !email || !skills || !workExperience || workExperience.length === 0 || !education || education.length === 0) {
        let missing = [];
        if (!name) missing.push('Name');
        if (!phone) missing.push('Phone');
        if (!email) missing.push('Email');
        if (!skills) missing.push('Skills');
        if (!workExperience || workExperience.length === 0) missing.push('Work Experience (at least one)');
        if (!education || education.length === 0) missing.push('Education (at least one)');

        console.log(`Profile POST validation failed for userId ${req.userId}: Missing ${missing.join(', ')}`);
        return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(', ')}` });
    }
    // Add more specific validation here if needed (e.g., email format, phone format using regex, date validity check)


    try {
        // Prepare the data object, including optional fields safely
        const profileData = {
            userId: req.userId, // Set from authenticate middleware
            name, phone, email, workExperience, education, skills,
            certifications: certifications || '', // Use empty string if null/undefined
            achievements: achievements || '',
            languages: languages || '',
            projects: projects || ''
            // Mongoose will handle converting date strings (like ISO from JSON) to Date objects for startDate/endDate
        };

        // Use replaceOne with upsert: true to handle create OR update
        // It finds a document matching userId and replaces it entirely with profileData,
        // or creates profileData if no document matches userId.
        const result = await Profile.replaceOne(
            { userId: req.userId }, // Filter: Find the profile for this user
            profileData,           // The new/updated data to insert/replace with
            { upsert: true }        // Option: Create if doesn't exist
        );

        // Determine if it was an insert or update for the response message
        let message = '';
        let statusCode = 200; // Default to OK for update/no change
        if (result.upsertedCount > 0) {
            message = 'Profile created successfully!';
            statusCode = 201; // Created
            console.log(`Profile created for userId: ${req.userId}`);
        } else if (result.modifiedCount > 0) {
            message = 'Profile updated successfully!';
            statusCode = 200; // OK
            console.log(`Profile updated for userId: ${req.userId}`);
        } else if (result.matchedCount > 0) {
            message = 'Profile data submitted, but no changes were detected.';
            statusCode = 200; // OK
            console.log(`Profile submitted but not modified for userId: ${req.userId}`);
        } else {
            // This case might mean the user record exists but the profile wasn't found or created, potentially an issue.
            console.warn("Profile replaceOne matched 0 and upserted 0, check logic.", result);
            message = 'Profile submission processed, but status unclear.';
            statusCode = 200;
        }

        res.status(statusCode).json({ success: true, message: message }); // Send status and message

    } catch (error) {
        console.error(`Profile Save/Update Error for userId ${req.userId}:`, error);
        // Handle potential duplicate key error for email (if another profile uses it)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ success: false, message: 'Email already in use by another profile.' });
        }
        // Handle potential duplicate key error for userId (shouldn't happen with upsert logic but good to be aware)
        if (error.code === 11000 && error.keyPattern && error.keyPattern.userId) {
            return res.status(400).json({ success: false, message: 'Profile conflict, possibly duplicate user association.' });
        }
        // General server error
        res.status(500).json({ success: false, message: 'Server error during profile save/update' });
    }
});

// --- Profile Read ---
router.get('/profiles', authenticate, async (req, res) => {
    console.log(`Profile GET request received for userId: ${req.userId}`);
    try {
        // Find the profile associated with the authenticated user
        const profile = await Profile.findOne({ userId: req.userId });

        if (!profile) {
            console.log(`Profile not found for userId: ${req.userId}`);
            // Return 404 - this is expected if the user hasn't created one yet
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        // Profile found, return it
        console.log(`Profile found and returned for userId: ${req.userId}`);
        res.json({ success: true, profile }); // Send the profile data

    } catch (error) {
        console.error(`Profile Retrieval Error for userId ${req.userId}:`, error);
        res.status(500).json({ success: false, message: 'Server error during profile retrieval' });
    }
});


module.exports = router; // Export the router