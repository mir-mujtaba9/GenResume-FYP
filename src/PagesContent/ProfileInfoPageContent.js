// src/PagesContent/ProfileInfoPageContent.js
import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap'; // Assuming you use Bootstrap here too

// Adjust path to where ProfileDisplay.js is located (likely ../components/)
import ProfileDisplay from '../components/ProfileDisplay';

// This component now fetches and displays the profile information
function ProfileInfoPageContent() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required to view profile information.');
        setIsLoading(false);
        return;
      }

      setError('');
      setIsLoading(true);

      try {
        // Fetch data from the GET /api/profiles endpoint
        const response = await fetch('http://localhost:5000/api/profiles', { // Ensure URL is correct
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok && data.success && data.profile) {
          console.log("Profile data fetched for display:", data.profile);
          setProfileData(data.profile); // Set the fetched data
        } else if (response.status === 404) {
          // Handle case where profile doesn't exist yet
          setError('No profile found. Please create your profile first using the "Create Profile" link.');
          setProfileData(null); // Ensure no old data is shown
        } else {
          // Handle other errors (401, 500, etc.)
          throw new Error(data.message || `Failed to load profile (${response.status})`);
        }
      } catch (err) {
        console.error("Error fetching profile for ProfileInfo:", err);
        setError(err.message || 'Could not fetch profile data.');
        setProfileData(null); // Ensure no old data is shown
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Render Logic ---
  if (isLoading) {
    return (
      <div className="text-center text-light p-5"> {/* Added padding */}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading profile information...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="m-3">{error}</Alert>; // Added margin
  }

  if (!profileData) {
    // This case might be redundant if error state covers 404, but good failsafe
    return <Alert variant="info" className="m-3">Profile data not available.</Alert>;
  }

  // If loading is done, no error, and data exists, render the display component
  return (
    <div>
      {/* You can add specific titles or structure for this content area if needed */}
      {/* <h2 className="text-white mb-3">Profile Information</h2> */}
      <ProfileDisplay profile={profileData} />
    </div>
  );
}

export default ProfileInfoPageContent;