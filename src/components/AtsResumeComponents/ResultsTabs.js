// src/components/AtsResumeComponents/ResultsTabs.js
import React from 'react';
import { Button } from 'react-bootstrap';

function ResultsTabs({ buttonsEnabled, activeSection, setActiveSection }) {
    const sections = [
        { key: 'analysis', label: 'Analysis' },
        { key: 'atsScore', label: 'ATS Score' },
        { key: 'tailoredResume', label: 'Tailored Resume' },
        { key: 'coverLetter', label: 'Cover Letter' },
        { key: 'coldEmail', label: 'Cold Email' },
    ];

    return (
        <div className="results-button-group">
            {sections.map((section) => (
                <Button
                    key={section.key}
                    className={`result-button ${activeSection === section.key ? 'active' : ''}`}
                    variant="outline-light"
                    disabled={!buttonsEnabled[section.key]}
                    onClick={() => setActiveSection(section.key)}
                >
                    {section.label}
                </Button>
            ))}
        </div>
    );
}

export default ResultsTabs;