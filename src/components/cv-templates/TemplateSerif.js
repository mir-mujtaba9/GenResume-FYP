// src/components/cv-templates/TemplateSerif.js
import React from 'react';
import './TemplateSerif.css'; // Specific CSS for this template

// Re-usable date formatter
const formatDateRange = (startDate, endDate) => {
    const formatOptions = { year: 'numeric', month: 'long' }; // e.g., "April 2025"
    const start = startDate ? new Date(startDate).toLocaleDateString('en-US', formatOptions) : '';
    let end = 'Present';
    if (endDate) {
        try { end = new Date(endDate).toLocaleDateString('en-US', formatOptions); }
        catch (e) { /* ignore invalid date */ }
    }
    if (!start) return '';
    return `${start} — ${end}`; // Using em dash for elegance
};

function TemplateSerif({ profile }) {
    return (
        <div className="resume-serif">
            <header className="resume-header-serif">
                <h1>{profile.name}</h1>
                <p className="contact-info-serif">
                    {profile.phone && <span>{profile.phone}</span>}
                    {profile.phone && profile.email && <span className="separator"> | </span>}
                    {profile.email && <span>{profile.email}</span>}
                    {/* Add other contact info like LinkedIn URL if available */}
                    {(profile.phone || profile.email) && profile.linkedin && <span className="separator"> | </span>}
                    {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                </p>
            </header>

            {/* Optional Summary */}
            {/* {profile.summary && (
                <section className="resume-section-serif">
                    <p className="summary-serif">{profile.summary}</p>
                </section>
            )} */}

            {profile.workExperience && profile.workExperience.length > 0 && (
                <section className="resume-section-serif">
                    <h2>PROFESSIONAL EXPERIENCE</h2>
                    {profile.workExperience.map((exp, index) => (
                        <div key={exp._id || index} className="resume-entry-serif">
                            <h3>{exp.jobTitle}</h3>
                            <p className="sub-heading-serif">
                                <span className="company-serif">{exp.company}</span>
                                <span className="dates-serif">{formatDateRange(exp.startDate, exp.endDate)}</span>
                            </p>
                            <p className="details-serif">{exp.responsibilities}</p>
                        </div>
                    ))}
                </section>
            )}

            {profile.education && profile.education.length > 0 && (
                <section className="resume-section-serif">
                    <h2>EDUCATION</h2>
                    {profile.education.map((edu, index) => (
                        <div key={edu._id || index} className="resume-entry-serif">
                            <h3>{edu.degree}</h3>
                            <p className="sub-heading-serif">
                                <span className="institution-serif">{edu.institution}</span>
                                <span className="dates-serif">{edu.graduationYear}</span>
                            </p>
                            {/* Optional details like GPA, Honors */}
                            {/* <p className="details-serif">{edu.details || ''}</p> */}
                        </div>
                    ))}
                </section>
            )}

            {profile.skills && (
                <section className="resume-section-serif">
                    <h2>SKILLS</h2>
                    <p className="skills-serif">{profile.skills}</p>
                </section>
            )}

            {/* Combine optional sections if needed, or keep separate */}
            {profile.projects && (
                <section className="resume-section-serif">
                    <h2>PROJECTS</h2>
                    <p className="details-serif">{profile.projects}</p>
                </section>
            )}
            {profile.certifications && (
                <section className="resume-section-serif">
                    <h2>CERTIFICATIONS</h2>
                    <p className="details-serif">{profile.certifications}</p>
                </section>
            )}
            {profile.languages && (
                <section className="resume-section-serif">
                    <h2>LANGUAGES</h2>
                    <p className="details-serif">{profile.languages}</p>
                </section>
            )}
            {profile.achievements && (
                <section className="resume-section-serif">
                    <h2>ACHIEVEMENTS</h2>
                    <p className="details-serif">{profile.achievements}</p>
                </section>
            )}
        </div>
    );
}

export default TemplateSerif;