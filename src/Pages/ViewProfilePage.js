// src/Pages/ViewProfilePage.js
import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';

// Assuming components are in ../components/ adjust path if needed
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileDisplay from '../components/ProfileDisplay';

function ViewProfilePage() {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            // ProtectedRoute should prevent access without token, but check anyway
            if (!token) {
                setError('Authentication required to view profile.');
                setIsLoading(false);
                return;
            }

            setError('');
            setIsLoading(true);

            try {
                const response = await fetch('http://localhost:5000/api/profiles', { // Your GET endpoint
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok && data.success && data.profile) {
                    setProfileData(data.profile);
                } else if (response.status === 404) {
                    setError('No profile found. Please create one first.');
                } else {
                    // Handle other errors (401, 500, etc.)
                    throw new Error(data.message || `Failed to load profile (${response.status})`);
                }
            } catch (err) {
                console.error("Error fetching profile for view:", err);
                setError(err.message || 'Could not fetch profile data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []); // Runs once on mount

    return (
        <>
            <Header />
            {/* Using similar section structure as Login/Register for consistency */}
            <section
                id="view-profile"
                className="bg-gray-dark relative z-10 overflow-hidden py-16 md:py-20 lg:py-28 min-h-screen"
            >
                <Container>
                    <h1 className="text-white mb-4">Your Profile</h1>
                    {isLoading && (
                        <div className="text-center text-light">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p className="mt-2">Loading profile...</p>
                        </div>
                    )}
                    {error && (
                        <Alert variant="danger">{error}</Alert>
                    )}
                    {!isLoading && !error && profileData && (
                        <ProfileDisplay profile={profileData} />
                    )}
                    {/* Optional: Link back to Dashboard or Edit Profile page */}
                    {/* {!isLoading && <div className="mt-4"><Button variant="secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button></div>} */}

                </Container>
                {/* Consider if background SVGs are desired here too */}
                {/* <BackgroundSVGs /> */}
            </section>
            <Footer />
        </>
    );
}

export default ViewProfilePage;