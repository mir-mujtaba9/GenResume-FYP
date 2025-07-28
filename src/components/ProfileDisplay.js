// src/components/ProfileDisplay.js (Corrected Again: Dates/Years/Placeholders -> White)
import React from 'react';
import { Card } from 'react-bootstrap';

// Helper function to format dates
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (e) {
        console.error("Error formatting date:", dateString, e);
        return 'Invalid Date';
    }
};

// Helper to check if a field has non-empty content
const hasContent = (field) => typeof field === 'string' && field.trim() !== '';

function ProfileDisplay({ profile }) {
    if (!profile) {
        // Changed "No profile" message to white
        return <p className="text-white p-6 text-lg italic">No profile data available.</p>;
    }

    const isProjectLink = hasContent(profile.projects) && (profile.projects.startsWith('http://') || profile.projects.startsWith('https://'));

    return (
        // Main container - Explicitly set base text to white
        <div className="text-white space-y-8 p-4 md:p-6">

            {/* --- Header Section --- */}
            <div className="border-b border-gray-700 pb-4 mb-6">
                <h2 className="mb-1 text-[#4665E4] font-semibold text-3xl">{profile.name || 'N/A'}</h2>
                <p className="mb-0 text-gray-100 text-lg">{profile.email || 'N/A'}</p>
            </div>

            {/* --- Contact Info Section --- */}
            <div className="mb-6">
                <h3 className="text-[#4665E4] font-semibold mb-3 text-xl">Contact</h3>
                <div className="bg-[#2C303B] p-4 rounded-lg border border-gray-700">
                    <p className="mb-1 text-base">
                        <strong className="font-medium text-gray-100">Phone:</strong> {profile.phone || 'N/A'}
                    </p>
                    {/* Display N/A for phone in white if needed */}
                    {!profile.phone && <span className="text-white italic">N/A</span>}
                </div>
            </div>

            {/* --- Skills Section --- */}
            <div className="mb-6">
                <h3 className="text-[#4665E4] font-semibold mb-3 text-xl">Skills</h3>
                <div className="bg-[#2C303B] p-4 rounded-lg border border-gray-700">
                    {hasContent(profile.skills) ? (
                        <p className="whitespace-pre-wrap leading-relaxed text-base text-white">{profile.skills}</p>
                    ) : (
                        // Changed Skills N/A placeholder to white
                        <p className="text-white italic text-base">N/A</p>
                    )}
                </div>
            </div>

            {/* --- Work Experience Section --- */}
            <div className="mb-6">
                <h3 className="text-[#4665E4] font-semibold mb-4 text-xl">Work Experience</h3>
                {profile.workExperience && profile.workExperience.length > 0 ? (
                    <div className="space-y-4">
                        {profile.workExperience.map((exp, index) => (
                            <Card key={exp._id || index} className="bg-[#2C303B] border border-gray-700 text-white">
                                <Card.Body className="p-4">
                                    <Card.Title as="h4" className="font-semibold text-lg text-gray-50">{exp.jobTitle || 'N/A'}</Card.Title>
                                    {/* Display N/A for job title in white if needed */}
                                    {!exp.jobTitle && <span className="text-white italic text-lg">N/A</span>}

                                    <Card.Subtitle className="mb-1 text-base text-blue-300">{exp.company || 'N/A'}</Card.Subtitle>
                                    {/* Display N/A for company in blue subtitle color or white? Let's use white */}
                                    {!exp.company && <span className="text-white italic text-base">N/A</span>}

                                    {/* === Changed Dates to white === */}
                                    <p className="mb-2 text-white text-sm">
                                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                                    </p>
                                    {/* Display N/A for dates in white */}
                                    {(!exp.startDate || !exp.endDate) && <span className="text-white italic text-sm">N/A</span>}


                                    <Card.Text className="whitespace-pre-wrap text-base leading-relaxed text-white">
                                        {exp.responsibilities || 'N/A'}
                                    </Card.Text>
                                    {/* Display N/A for responsibilities in white if needed */}
                                    {!exp.responsibilities && <span className="text-white italic text-base">N/A</span>}
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#2C303B] p-4 rounded-lg border border-gray-700">
                        {/* Changed "No work experience" placeholder to white */}
                        <p className="text-white italic text-base mb-0">No work experience provided.</p>
                    </div>
                )}
            </div>

            {/* --- Education Section --- */}
            <div className="mb-6">
                <h3 className="text-[#4665E4] font-semibold mb-4 text-xl">Education</h3>
                {profile.education && profile.education.length > 0 ? (
                    <div className="space-y-4">
                        {profile.education.map((edu, index) => (
                            <Card key={edu._id || index} className="bg-[#2C303B] border border-gray-700 text-white">
                                <Card.Body className="p-4">
                                    <Card.Title as="h4" className="font-semibold text-lg text-gray-50">{edu.degree || 'N/A'}</Card.Title>
                                    {/* Display N/A for degree in white */}
                                    {!edu.degree && <span className="text-white italic text-lg">N/A</span>}

                                    <Card.Subtitle className="mb-1 text-base text-blue-300">{edu.institution || 'N/A'}</Card.Subtitle>
                                    {/* Display N/A for institution in white */}
                                    {!edu.institution && <span className="text-white italic text-base">N/A</span>}

                                    {/* === Changed Graduation Year to white === */}
                                    <Card.Text className="text-white text-sm">
                                        Graduation Year: {edu.graduationYear || 'N/A'}
                                    </Card.Text>
                                    {/* Display N/A for year in white */}
                                    {!edu.graduationYear && <span className="text-white italic text-sm">N/A</span>}

                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#2C303B] p-4 rounded-lg border border-gray-700">
                        {/* Changed "No education" placeholder to white */}
                        <p className="text-white italic text-base mb-0">No education provided.</p>
                    </div>
                )}
            </div>

            {/* --- Additional Info Section --- */}
            {(hasContent(profile.certifications) || hasContent(profile.achievements) || hasContent(profile.languages) || hasContent(profile.projects)) && (
                <div className="mb-6">
                    <h3 className="text-[#4665E4] font-semibold mb-4 text-xl">Additional Info</h3>
                    <div className="bg-[#2C303B] p-4 rounded-lg border border-gray-700 space-y-5">
                        {hasContent(profile.certifications) && (
                            <div>
                                <h4 className="font-medium text-lg text-gray-100">Certifications</h4>
                                <p className="whitespace-pre-wrap text-base text-white leading-relaxed">{profile.certifications}</p>
                            </div>
                        )}
                        {hasContent(profile.achievements) && (
                            <div>
                                <h4 className="font-medium text-lg text-gray-100">Achievements/Awards</h4>
                                <p className="whitespace-pre-wrap text-base text-white leading-relaxed">{profile.achievements}</p>
                            </div>
                        )}
                        {hasContent(profile.languages) && (
                            <div>
                                <h4 className="font-medium text-lg text-gray-100">Languages</h4>
                                <p className="whitespace-pre-wrap text-base text-white leading-relaxed">{profile.languages}</p>
                            </div>
                        )}
                        {hasContent(profile.projects) && (
                            <div>
                                <h4 className="font-medium text-lg text-gray-100">Projects/Portfolio</h4>
                                {isProjectLink ? (
                                    <a href={profile.projects} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline break-all text-base">
                                        {profile.projects}
                                    </a>
                                ) : (
                                    <p className="whitespace-pre-wrap text-base text-white leading-relaxed">{profile.projects}</p>
                                )}
                            </div>
                        )}
                        {/* Add explicit N/A handling for Additional Info if desired */}
                        {!hasContent(profile.certifications) && !hasContent(profile.achievements) && !hasContent(profile.languages) && !hasContent(profile.projects) && (
                            <p className="text-white italic text-base mb-0">No additional information provided.</p>
                        )}
                    </div>
                </div>
            )}
            {/* Handle case where the entire "Additional Info" section might be empty */}
            {!hasContent(profile.certifications) && !hasContent(profile.achievements) && !hasContent(profile.languages) && !hasContent(profile.projects) && profile.workExperience?.length > 0 && profile.education?.length > 0 && hasContent(profile.skills) && (
                <div className="mb-6">
                    <h3 className="text-[#4665E4] font-semibold mb-4 text-xl">Additional Info</h3>
                    <div className="bg-[#2C303B] p-4 rounded-lg border border-gray-700">
                        <p className="text-white italic text-base mb-0">No additional information provided.</p>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ProfileDisplay;