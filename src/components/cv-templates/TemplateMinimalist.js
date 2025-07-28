// src/components/cv-templates/TemplateMinimalist.js
import React from 'react';
import './TemplateMinimalist.css'; // Specific CSS

// Helper to format dates compactly
const formatDateRangeCompact = (startDate, endDate) => {
    const formatOptions = { year: 'numeric', month: 'short' };
    const start = startDate ? new Date(startDate).toLocaleDateString('en-US', formatOptions) : '';
    let end = 'Present';
    if (endDate) {
        try { end = new Date(endDate).toLocaleDateString('en-US', formatOptions); }
        catch (e) { /* ignore */ }
    }
    if (!start) return '';
    return `${start} - ${end}`;
};

function TemplateMinimalist({ profile }) {
    return (
        <div className="resume-minimalist">
            <header className="resume-header-minimalist">
                <h1>{profile.name}</h1>
                {/* Contact info inline */}
                <p className="contact-info-minimalist">
                    {profile.phone && <span>{profile.phone}</span>}
                    {profile.phone && profile.email && <span> | </span>}
                    {profile.email && <span>{profile.email}</span>}
                    {/* Add LinkedIn etc. inline if available */}
                </p>
            </header>

            {/* Optional Summary */}
            {/* {profile.summary && <section className="resume-section-minimalist"><p>{profile.summary}</p></section>} */}

            {profile.workExperience && profile.workExperience.length > 0 && (
                <section className="resume-section-minimalist">
                    <h2>Experience</h2>
                    {profile.workExperience.map((exp, index) => (
                        <div key={exp._id || index} className="resume-entry-minimalist">
                            {/* Combine Title and Company */}
                            <h3>{exp.jobTitle} <span className="company-separator">at</span> {exp.company}</h3>
                            <p className="dates-minimalist">{formatDateRangeCompact(exp.startDate, exp.endDate)}</p>
                            <p className="details-minimalist">{exp.responsibilities}</p>
                        </div>
                    ))}
                </section>
            )}

            {profile.education && profile.education.length > 0 && (
                <section className="resume-section-minimalist">
                    <h2>Education</h2>
                    {profile.education.map((edu, index) => (
                        <div key={edu._id || index} className="resume-entry-minimalist">
                            {/* Combine Degree and Institution */}
                            <h3>{edu.degree}<span className="company-separator">,</span> {edu.institution}</h3>
                            <p className="dates-minimalist">{edu.graduationYear}</p>
                        </div>
                    ))}
                </section>
            )}

            {profile.skills && (
                <section className="resume-section-minimalist skills-section-minimalist">
                    <h2>Skills</h2>
                    <p>{profile.skills}</p>
                </section>
            )}

            {/* Combine optional sections if they exist */}
            {(profile.projects || profile.certifications || profile.languages || profile.achievements) && (
                <section className="resume-section-minimalist">
                    <h2>Additional</h2>
                    {profile.projects && (
                        <p><strong className="additional-label">Projects:</strong> {profile.projects}</p>
                    )}
                    {profile.certifications && (
                        <p><strong className="additional-label">Certifications:</strong> {profile.certifications}</p>
                    )}
                    {profile.languages && (
                        <p><strong className="additional-label">Languages:</strong> {profile.languages}</p>
                    )}
                    {profile.achievements && (
                        <p><strong className="additional-label">Achievements:</strong> {profile.achievements}</p>
                    )}
                </section>
            )}
        </div>
    );
}

export default TemplateMinimalist;