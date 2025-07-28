// src/components/cv-templates/TemplateSkillFocus.js
import React from 'react';
import './TemplateSkillFocus.css'; // Specific CSS

const formatDateRange = (startDate, endDate) => {
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

function TemplateSkillFocus({ profile }) {
    return (
        <div className="resume-skillfocus">
            <header className="resume-header-skillfocus">
                <h1>{profile.name}</h1>
                {/* Optional Headline */}
                {/* <p className="headline-skillfocus">{profile.headline || 'Professional Headline'}</p> */}
                <p className="contact-info-skillfocus">
                    {profile.phone && <span>{profile.phone}</span>}
                    {profile.phone && profile.email && <span className="separator"> • </span>}
                    {profile.email && <span>{profile.email}</span>}
                    {(profile.phone || profile.email) && profile.linkedin && <span className="separator"> • </span>}
                    {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>}
                </p>
            </header>

            {/* --- Skills Section - Placed Prominently --- */}
            {profile.skills && (
                <section className="resume-section-skillfocus skills-highlight">
                    <h2>KEY SKILLS</h2>
                    {/* Consider formatting skills as a list or categorized */}
                    <ul className="skills-list">
                        {profile.skills.split(/,|\n/).map((skill, index) =>
                            skill.trim() ? <li key={index}>{skill.trim()}</li> : null
                        )}
                    </ul>
                    {/* Or as a paragraph */}
                    {/* <p>{profile.skills}</p> */}
                </section>
            )}


            {/* --- Experience Section --- */}
            {profile.workExperience && profile.workExperience.length > 0 && (
                <section className="resume-section-skillfocus">
                    <h2>EXPERIENCE</h2>
                    {profile.workExperience.map((exp, index) => (
                        <div key={exp._id || index} className="resume-entry-skillfocus">
                            <div className="entry-header-skillfocus">
                                <h3>{exp.jobTitle}</h3>
                                <span className="dates-skillfocus">{formatDateRange(exp.startDate, exp.endDate)}</span>
                            </div>
                            <p className="sub-heading-skillfocus">{exp.company}</p>
                            <p className="details-skillfocus">{exp.responsibilities}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* --- Education Section --- */}
            {profile.education && profile.education.length > 0 && (
                <section className="resume-section-skillfocus">
                    <h2>EDUCATION</h2>
                    {profile.education.map((edu, index) => (
                        <div key={edu._id || index} className="resume-entry-skillfocus">
                            <div className="entry-header-skillfocus">
                                <h3>{edu.degree}</h3>
                                <span className="dates-skillfocus">{edu.graduationYear}</span>
                            </div>
                            <p className="sub-heading-skillfocus">{edu.institution}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* --- Optional Sections (Projects, Certs, etc.) --- */}
            {(profile.projects || profile.certifications || profile.languages || profile.achievements) && (
                <section className="resume-section-skillfocus">
                    <h2>ADDITIONAL</h2>
                    {profile.projects && (
                        <div className="additional-entry-skillfocus">
                            <h4>Projects</h4>
                            <p>{profile.projects}</p>
                        </div>
                    )}
                    {profile.certifications && (
                        <div className="additional-entry-skillfocus">
                            <h4>Certifications</h4>
                            <p>{profile.certifications}</p>
                        </div>
                    )}
                    {profile.languages && (
                        <div className="additional-entry-skillfocus">
                            <h4>Languages</h4>
                            <p>{profile.languages}</p>
                        </div>
                    )}
                    {profile.achievements && (
                        <div className="additional-entry-skillfocus">
                            <h4>Achievements</h4>
                            <p>{profile.achievements}</p>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}

export default TemplateSkillFocus;