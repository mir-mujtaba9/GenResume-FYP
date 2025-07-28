// src/components/cv-templates/TemplateClassic.js
import React from 'react';
import './TemplateClassic.css'; // Specific CSS for this template

// Helper to format dates consistently
const formatDateRange = (startDate, endDate) => {
    const start = startDate ? new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
    // Handle "Present" case if endDate is null or invalid
    let end = 'Present';
    if (endDate) {
        try {
            end = new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        } catch (e) { /* ignore invalid date, keep 'Present' */ }
    }
    // If start date is missing, don't show range
    if (!start) return '';
    return `${start} - ${end}`;
};

function TemplateClassic({ profile }) {
    return (
        // The outer div matches the CSS file name for styling scope
        <div className="resume-classic">
            <header className="resume-header">
                <h1>{profile.name}</h1>
                <p className="contact-info">
                    {profile.phone && <span>{profile.phone} | </span>}
                    {profile.email && <span>{profile.email}</span>}
                    {/* TODO: Add LinkedIn/Portfolio if available in profile data */}
                </p>
            </header>

            {/* Example: Include Summary if available */}
            {profile.summary && ( // Assuming you might add a 'summary' field to your profile
                <section className="resume-section">
                    <h2>Summary</h2>
                    <p>{profile.summary}</p>
                </section>
            )}

            {profile.workExperience && profile.workExperience.length > 0 && (
                <section className="resume-section">
                    <h2>Work Experience</h2>
                    {profile.workExperience.map((exp, index) => (
                        <div key={exp._id || index} className="resume-entry">
                            <h3>{exp.jobTitle}</h3>
                            <p className="sub-heading">{exp.company} | {formatDateRange(exp.startDate, exp.endDate)}</p>
                            {/* Render responsibilities as a simple paragraph or list */}
                            <p className="details">{exp.responsibilities}</p>
                            {/* Example: Render as bullet points if responsibilities contain newlines */}
                            {/* <ul className="details-list">
                                {exp.responsibilities?.split('\n').map((item, i) => item.trim() && <li key={i}>{item.trim()}</li>)}
                            </ul> */}
                        </div>
                    ))}
                </section>
            )}

            {profile.education && profile.education.length > 0 && (
                <section className="resume-section">
                    <h2>Education</h2>
                    {profile.education.map((edu, index) => (
                        <div key={edu._id || index} className="resume-entry">
                            <h3>{edu.degree}</h3>
                            <p className="sub-heading">{edu.institution} | Graduated: {edu.graduationYear}</p>
                            {/* TODO: Add GPA or relevant coursework if available */}
                        </div>
                    ))}
                </section>
            )}

            {profile.skills && (
                <section className="resume-section">
                    <h2>Skills</h2>
                    {/* Render skills - could be comma-separated or formatted as list */}
                    <p>{profile.skills}</p>
                </section>
            )}

            {/* Conditionally render optional sections */}
            {(profile.projects || profile.certifications || profile.languages || profile.achievements) && (
                <section className="resume-section">
                    {/* Keep H2 consistent or omit if preferred */}
                    <h2>Additional Information</h2>
                    {profile.projects && (
                        <div className="resume-entry additional-entry">
                            <h3>Projects</h3>
                            <p>{profile.projects}</p>
                        </div>
                    )}
                    {profile.certifications && (
                        <div className="resume-entry additional-entry">
                            <h3>Certifications</h3>
                            <p>{profile.certifications}</p>
                        </div>
                    )}
                    {profile.languages && (
                        <div className="resume-entry additional-entry">
                            <h3>Languages</h3>
                            <p>{profile.languages}</p>
                        </div>
                    )}
                    {profile.achievements && (
                        <div className="resume-entry additional-entry">
                            <h3>Achievements/Awards</h3>
                            <p>{profile.achievements}</p>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}

export default TemplateClassic;