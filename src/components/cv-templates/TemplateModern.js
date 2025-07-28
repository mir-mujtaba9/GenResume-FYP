// src/components/cv-templates/TemplateModern.js
import React from 'react';
import './TemplateModern.css'; // Separate CSS

const formatDateRange = (startDate, endDate) => {
    const start = startDate ? new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
    let end = 'Present';
    if (endDate) {
        try { end = new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }); }
        catch (e) { /* ignore */ }
    }
    if (!start) return '';
    return `${start} - ${end}`;
};

function TemplateModern({ profile }) {
    return (
        <div className="resume-modern">
            {/* Sidebar */}
            <aside className="sidebar-modern">
                <section className="sidebar-section contact-section">
                    <h2>Contact</h2>
                    <p>{profile.phone}</p>
                    <p>{profile.email}</p>
                    {/* TODO: Add LinkedIn, Portfolio links here */}
                    {/* <p><a href={profile.linkedin}>LinkedIn</a></p> */}
                    {/* <p><a href={profile.portfolio}>Portfolio</a></p> */}
                </section>

                {profile.skills && (
                    <section className="sidebar-section skills-section">
                        <h2>Skills</h2>
                        <p>{profile.skills}</p> {/* Consider formatting as list */}
                    </section>
                )}

                {profile.languages && (
                    <section className="sidebar-section">
                        <h2>Languages</h2>
                        <p>{profile.languages}</p>
                    </section>
                )}
                {profile.certifications && (
                    <section className="sidebar-section">
                        <h2>Certifications</h2>
                        <p>{profile.certifications}</p>
                    </section>
                )}
            </aside>

            {/* Main Content Area */}
            <div className="main-content-modern">
                <header className="resume-header-modern">
                    <h1>{profile.name}</h1>
                    {/* Optional: Add a professional title/headline if available */}
                    {/* <p className="headline">{profile.headline || 'Your Professional Headline'}</p> */}
                </header>

                {/* Optional: Summary */}
                {/* {profile.summary && (
                    <section className="resume-section-modern">
                        <h2>Summary</h2>
                        <p>{profile.summary}</p>
                    </section>
                )} */}

                {profile.workExperience && profile.workExperience.length > 0 && (
                    <section className="resume-section-modern">
                        <h2>Work Experience</h2>
                        {profile.workExperience.map((exp, index) => (
                            <div key={exp._id || index} className="resume-entry-modern">
                                <div className="entry-header">
                                    <h3>{exp.jobTitle}</h3>
                                    <span className="entry-dates">{formatDateRange(exp.startDate, exp.endDate)}</span>
                                </div>
                                <p className="sub-heading">{exp.company}</p>
                                <p className="details">{exp.responsibilities}</p>
                            </div>
                        ))}
                    </section>
                )}

                {profile.education && profile.education.length > 0 && (
                    <section className="resume-section-modern">
                        <h2>Education</h2>
                        {profile.education.map((edu, index) => (
                            <div key={edu._id || index} className="resume-entry-modern">
                                <div className="entry-header">
                                    <h3>{edu.degree}</h3>
                                    <span className="entry-dates">{edu.graduationYear}</span>
                                </div>
                                <p className="sub-heading">{edu.institution}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* Optional: Move Projects/Achievements to main column */}
                {profile.projects && (
                    <section className="resume-section-modern">
                        <h2>Projects</h2>
                        {/* Consider more detailed project formatting if needed */}
                        <p>{profile.projects}</p>
                    </section>
                )}
                {profile.achievements && (
                    <section className="resume-section-modern">
                        <h2>Achievements</h2>
                        <p>{profile.achievements}</p>
                    </section>
                )}
            </div>
        </div>
    );
}
export default TemplateModern;