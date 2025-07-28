// src/components/ProfileContent.js (or your correct path, e.g., src/PagesContent/ProfileContent.js)

import React, { useState, useEffect } from 'react'; // Added useEffect
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
// Adjust import paths based on your actual structure
import { profileSchema, defaultProfileValues } from '../schemas/profileSchema';
import ContactInfoSection from './profilePageContent/ContactInfoSection'; // Assuming these are in a subdir
import WorkExperienceSection from './profilePageContent/WorkExperienceSection';
import EducationSection from './profilePageContent/EducationSection';
import AdditionalInfoSection from './profilePageContent/AdditionalInfoSection';
import '../styling/ProfileContent.css'; // Adjust path if needed

function ProfileContent() {
    // State for submission status/loading/error
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Submission loading
    const [submitError, setSubmitError] = useState('');

    // --- State for Editing ---
    const [isEditing, setIsEditing] = useState(false); // Are we editing an existing profile?
    const [isFetching, setIsFetching] = useState(true); // Are we initially fetching data?
    const [fetchError, setFetchError] = useState(''); // Error during initial fetch

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset // Get reset function from useForm
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: defaultProfileValues, // Start with default values
        mode: 'onBlur',
    });

    const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({ control, name: "workExperience" });
    const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });

    // --- Fetch Profile Data on Mount ---
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token'); // Token stored by LoginPage.js
            if (!token) {
                // This case should ideally be prevented by ProtectedRoute, but good failsafe
                setFetchError('Authentication required. Please log in.');
                setIsFetching(false);
                return;
            }

            setFetchError('');
            setIsFetching(true);

            try {
                // Use the backend endpoint confirmed in previous steps
                const response = await fetch('http://localhost:5000/api/profiles', { // Ensure this matches your backend
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Send token from localStorage
                    }
                });

                if (response.ok) { // Status 200 OK
                    const data = await response.json();
                    if (data.success && data.profile) {
                        console.log("Existing profile fetched:", data.profile);
                        // Ensure data structure matches form expectations before resetting
                        const profileToReset = {
                            ...data.profile,
                            workExperience: (data.profile.workExperience || []).map(exp => ({
                                ...exp,
                                // Convert ISO strings back to Date objects for DatePicker
                                startDate: exp.startDate ? new Date(exp.startDate) : null,
                                endDate: exp.endDate ? new Date(exp.endDate) : null,
                            })),
                            education: data.profile.education || [], // Ensure array exists
                            // Ensure optional fields are reset correctly (use empty string if null/undefined)
                            certifications: data.profile.certifications || '',
                            achievements: data.profile.achievements || '',
                            languages: data.profile.languages || '',
                            projects: data.profile.projects || '',
                            // Ensure required fields also have fallbacks if backend could omit them
                            name: data.profile.name || '',
                            phone: data.profile.phone || '',
                            email: data.profile.email || '',
                            skills: data.profile.skills || '',
                        };
                        reset(profileToReset); // Populate form
                        setIsEditing(true); // Set mode to editing
                    } else {
                        console.log("API success, but no profile data in response. Assuming new profile.");
                        setIsEditing(false);
                        reset(defaultProfileValues);
                    }
                } else if (response.status === 404) {
                    // Profile not found - This is the expected case for a new user
                    console.log("No existing profile found (404). Ready for creation.");
                    setIsEditing(false); // Set mode to creating
                    reset(defaultProfileValues); // Ensure form starts empty
                } else {
                    // Handle other errors (401, 500, etc.)
                    const errorData = await response.json().catch(() => ({ message: response.statusText }));
                    console.error("Error fetching profile:", response.status, errorData);
                    setFetchError(`Failed to load profile data: ${errorData.message || response.statusText}`);
                    setIsEditing(false);
                }
            } catch (error) {
                console.error("Network error fetching profile:", error);
                setFetchError('Network error: Could not connect to server to load profile.');
                setIsEditing(false);
            } finally {
                setIsFetching(false); // Done fetching attempt
            }
        };

        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]); // Dependency array includes 'reset'

    // --- Form Submission Handler (Uses POST for both Create/Update) ---
    const handleFormSubmit = async (data) => {
        setSubmitError('');
        setIsLoading(true); // Start submission loading indicator
        const token = localStorage.getItem('token');
        if (!token) {
            setSubmitError('Authentication session expired. Please log in again.');
            setIsLoading(false);
            return;
        }

        console.log(`Submitting profile data (${isEditing ? 'Update' : 'Create'}):`, data);

        try {
            // Backend's POST /api/profiles handles both create & update via upsert
            const response = await fetch('http://localhost:5000/api/profiles', { // Ensure this matches your backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Dates from DatePicker are Date objects, JSON.stringify converts them to ISO strings
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (!response.ok) {
                // Use error message from backend if available
                throw new Error(responseData.message || `HTTP error! Status: ${response.status}`);
            }

            // Success
            console.log("Submission successful:", responseData.message);
            setSubmitted(true); // Show success message

        } catch (error) {
            console.error("Submission Error:", error);
            setSubmitError(`Failed to ${isEditing ? 'update' : 'create'} profile: ${error.message}`);
            setSubmitted(false); // Keep form visible on error
        } finally {
            setIsLoading(false); // Stop submission loading indicator
        }
    };

    // --- Render Logic ---

    if (isFetching) { // Show loading indicator during initial fetch
        return (
            <Card className="ProfilePageContent-card bg-[#1B212D] border-0">
                <Card.Body className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                    <Spinner animation="border" role="status" variant="light">
                        <span className="visually-hidden">Loading profile...</span>
                    </Spinner>
                    <span className="ms-3 text-light">Loading profile data...</span>
                </Card.Body>
            </Card>
        );
    }

    if (fetchError) { // Show error if initial fetch failed
        return (
            <Card className="ProfilePageContent-card bg-[#1B212D] border-0">
                <Card.Body>
                    <Alert variant="danger">{fetchError}</Alert>
                </Card.Body>
            </Card>
        );
    }

    if (submitted) { // Show success message after submission
        return (
            <Card className="ProfilePageContent-card bg-[#1B212D] border-0">
                <Card.Body>
                    <Alert variant="success" className="text-center">
                        <Alert.Heading>Profile Saved Successfully!</Alert.Heading>
                        <p>Your profile has been {isEditing ? 'updated' : 'created'}.</p>
                    </Alert>
                </Card.Body>
            </Card>
        );
    }

    // --- Render the Form (Create or Edit) ---
    return (
        <Card className="ProfilePageContent-card bg-[#1B212D] border-0">
            <Card.Body>
                {/* Use handleSubmit from react-hook-form, it calls handleFormSubmit after validation */}
                <Form onSubmit={handleSubmit(handleFormSubmit)}>

                    {submitError && ( // Show general submission errors
                        <Alert variant="danger" onClose={() => setSubmitError('')} dismissible>
                            {submitError}
                        </Alert>
                    )}

                    <h1 className="mb-4 text-white">
                        {isEditing ? 'Edit Your Profile' : 'Create Your Profile'}
                    </h1>

                    {/* Form Sections - Pass register, errors, control */}
                    <ContactInfoSection register={register} errors={errors} />
                    <WorkExperienceSection
                        fields={workFields} append={appendWork} remove={removeWork}
                        register={register} errors={errors} control={control}
                    />
                    <EducationSection
                        fields={eduFields} append={appendEdu} remove={removeEdu}
                        register={register} errors={errors}
                    />
                    <AdditionalInfoSection register={register} errors={errors} />

                    {/* Submit Button */}
                    <div className="d-grid">
                        <Button
                            variant="primary" type="submit" disabled={isLoading || isFetching} // Also disable if initially fetching
                        >
                            {isLoading ? ( // Show spinner when submitting
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span className="visually-hidden">Submitting...</span>{' '}Submitting...
                                </>
                            ) : (
                                // Dynamic button text
                                isEditing ? 'Update Profile' : 'Create Profile'
                            )}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ProfileContent;