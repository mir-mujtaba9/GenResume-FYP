// src/components/AtsResumeComponents/AtsScoreDisplay.js
import React from 'react';

function AtsScoreDisplay({ atsScore }) {
    const hasSections = atsScore.section_scores && Object.entries(atsScore.section_scores).length > 0;
    const hasSuggestions = atsScore.improvement_suggestions?.length > 0;
    const hasKeywords = atsScore.keyword_density && Object.entries(atsScore.keyword_density).length > 0;
    const hasAnyData = hasSections || hasSuggestions || hasKeywords;

    return (
        <div className="result-card ats-score-section">
            <h3>✅ ATS Score</h3>
            <div className="ats-score-summary">
                <strong>Total Score: {atsScore.total_score ?? 'N/A'}</strong>
            </div>

            {hasAnyData ? (
                <div className="ats-score-grid">
                    {/* Section Scores Column */}
                    {hasSections && (
                        <div className="ats-score-column">
                            <h4>Section Scores</h4>
                            {Object.entries(atsScore.section_scores).map(([section, details], index) => (
                                <div key={index} className="ats-section-card">
                                    <h5>{section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h5>
                                    <p>Score: {details.score ?? 'N/A'} / {details.max ?? 'N/A'}</p>
                                    {details.details?.length > 0 && (
                                        <ul>
                                            {details.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Improvements and Keywords Column */}
                    {(hasSuggestions || hasKeywords) && ( // Only render column if it has content
                        <div className="ats-score-column">
                            {hasSuggestions && (
                                <div className="ats-suggestions-card">
                                    <h4>Improvement Suggestions</h4>
                                    <ul>
                                        {atsScore.improvement_suggestions.map((suggestion, index) => (
                                            <li key={`sug-${index}`}>{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {hasKeywords && (
                                <div className="ats-keywords-card">
                                    <h4>Keyword Density</h4>
                                    <ul>
                                        {Object.entries(atsScore.keyword_density).map(([keyword, count], index) => (
                                            <li key={`kw-${index}`}>{keyword}: {count}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <p>ATS Score details not available.</p>
            )}
        </div>
    );
}

export default AtsScoreDisplay;