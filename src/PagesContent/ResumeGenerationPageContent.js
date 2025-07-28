// src/PagesContent/ResumeGenerationPageContent.js
// UPDATED to include Serif and SkillFocus templates
import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Button, ButtonGroup } from 'react-bootstrap';

// Import ALL HTML Template components for preview:
import TemplateClassic from '../components/cv-templates/TemplateClassic';
import TemplateModern from '../components/cv-templates/TemplateModern';
import TemplateMinimalist from '../components/cv-templates/TemplateMinimalist';
import TemplateSerif from '../components/cv-templates/TemplateSerif';         // Added
import TemplateSkillFocus from '../components/cv-templates/TemplateSkillFocus'; // Added

// Import the component that handles PDF downloading:
import ResumeDownloader from '../components/ResumeDownloader';
// Import basic styling for the preview container area:
import '../styling/ResumePreview.css';

function ResumeGenerationPageContent() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTemplate, setActiveTemplate] = useState('classic'); // Default

    // useEffect hook for fetching data... (This part remains the same as your provided code)
    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('token');
            if (!token) { setError('Authentication required. Please log in.'); setIsLoading(false); return; }
            setError(''); setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/profiles', { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
                if (!response.ok) {
                    if (response.status === 404) { setError('No profile found. Please create your profile first using the "Create Profile" link.'); }
                    else { const d = await response.json().catch(() => ({})); setError(`Failed to load profile: ${d.message || response.statusText}`); }
                    setProfile(null);
                } else {
                    const data = await response.json();
                    if (data.success && data.profile) {
                        const fetchedProfile = {
                            ...data.profile,
                            workExperience: (data.profile.workExperience || []).map(e => ({ ...e, startDate: e.startDate || null, endDate: e.endDate || null })),
                            education: data.profile.education || [],
                            name: data.profile.name || 'N/A', email: data.profile.email || 'N/A', phone: data.profile.phone || 'N/A',
                            skills: data.profile.skills || '', projects: data.profile.projects || '', certifications: data.profile.certifications || '',
                            languages: data.profile.languages || '', achievements: data.profile.achievements || '',
                        };
                        setProfile(fetchedProfile);
                    } else { setError('Profile data is missing or invalid.'); setProfile(null); }
                }
            } catch (err) { console.error("Error fetching profile:", err); if (!error) setError('Error fetching profile data.'); setProfile(null); }
            finally { setIsLoading(false); }
        };
        fetchProfileData();
    }, []); // Removed 'error' from dependency array to prevent potential loops if fetch fails repeatedly

    // UPDATED function to render the correct HTML template preview
    const renderTemplate = () => {
        if (!profile) return null;
        switch (activeTemplate) {
            case 'modern': return <TemplateModern profile={profile} />;
            case 'minimalist': return <TemplateMinimalist profile={profile} />;
            case 'serif': return <TemplateSerif profile={profile} />;         // Added
            case 'skillfocus': return <TemplateSkillFocus profile={profile} />; // Added
            case 'classic': default: return <TemplateClassic profile={profile} />;
        }
    };

    // --- Render Logic --- (Spinner and Error handling remains the same)
    if (isLoading) { /* ... show spinner ... */
        return (<div className="d-flex justify-content-center align-items-center text-white" style={{ minHeight: '400px', padding: '20px' }}><Spinner animation="border" variant="light" /><span className="ms-3 fs-5">Loading...</span></div>);
    }
    if (error) { /* ... show error alert ... */
        return <Alert variant="danger" className="m-4">{error}</Alert>;
    }
    if (!profile) { /* ... show warning alert ... */
        return <Alert variant="warning" className="m-4">Profile data unavailable.</Alert>;
    }

    // Main render with UPDATED buttons
    return (
        <div className="resume-generator-container p-3 p-md-4">
            <h2 className="text-white mb-4">Resume Preview & Download</h2>
            <div className="controls mb-4 p-3 bg-dark rounded shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-center flex-wrap">
                {/* UPDATED ButtonGroup */}
                <ButtonGroup aria-label="Template Selection" className="mb-3 mb-md-0 me-md-3">
                    <Button variant={activeTemplate === 'classic' ? 'primary' : 'outline-light'} onClick={() => setActiveTemplate('classic')} size="lg">Classic</Button>
                    <Button variant={activeTemplate === 'modern' ? 'primary' : 'outline-light'} onClick={() => setActiveTemplate('modern')} size="lg">Modern</Button>
                    <Button variant={activeTemplate === 'minimalist' ? 'primary' : 'outline-light'} onClick={() => setActiveTemplate('minimalist')} size="lg">Minimalist</Button>
                    <Button variant={activeTemplate === 'serif' ? 'primary' : 'outline-light'} onClick={() => setActiveTemplate('serif')} size="lg">Serif</Button>
                    <Button variant={activeTemplate === 'skillfocus' ? 'primary' : 'outline-light'} onClick={() => setActiveTemplate('skillfocus')} size="lg">SkillFocus</Button>
                </ButtonGroup>
                <div className="mt-3 mt-md-0">
                    {/* ResumeDownloader needs the updated profile and activeTemplate */}
                    {/* <ResumeDownloader profile={profile} template={activeTemplate} /> */}
                </div>
            </div>
            <div className="resume-preview-area">
                {renderTemplate()}
            </div>
        </div>
    );
}
export default ResumeGenerationPageContent;