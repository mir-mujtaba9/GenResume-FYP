// routes/github.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// IMPORTANT: Reads token from .env file!
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

router.get('/:username', async (req, res) => {
    const { username } = req.params; // Use the username from the URL parameter

    if (!GITHUB_TOKEN) {
        console.error('GitHub token not configured in .env');
        return res.status(500).send('Server configuration error: Missing GitHub token');
    }

    try {
        // Correctly use the username variable in the template literal
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json' // Good practice to set Accept header
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('GitHub API Error:', error.response ? error.response.data : error.message);
        // Send back the status code received from GitHub if available, otherwise 500
        res.status(error.response ? error.response.status : 500).send('Error fetching data from GitHub');
    }
});

module.exports = router;