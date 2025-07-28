// src/components/AtsResumeComponents/AnalysisDisplay.js
import React from 'react';

// Helper function to render skills analysis (moved inside or imported if used elsewhere)
const RenderSkillsAnalysis = ({ skillsAnalysis }) => {
    if (!skillsAnalysis || (!skillsAnalysis.matched?.length && !skillsAnalysis.missing?.length)) {
        return null; // Return null if no skills data to render
    }

    const { matched, missing } = skillsAnalysis;
    return (
        // Removed the outer div to integrate directly into the grid item
        <>
            <h5>Skills Analysis</h5>
            {matched?.length > 0 && (
                <>
                    <h6>Matched Skills:</h6>
                    <ul className="skills-list matched-skills">
                        {matched.map((skill, index) => <li key={`matched-${index}`}>{skill}</li>)}
                    </ul>
                </>
            )}
            {missing?.length > 0 && (
                <>
                    <h6>Missing Skills:</h6>
                    <ul className="skills-list missing-skills">
                        {missing.map((skill, index) => <li key={`missing-${index}`}>{skill}</li>)}
                    </ul>
                </>
            )}
        </>
    );
};


function AnalysisDisplay({ analysisData }) {
    const hasImprovements = analysisData.improvements?.length > 0;
    const hasSkills = analysisData.skills_analysis && (analysisData.skills_analysis.matched?.length > 0 || analysisData.skills_analysis.missing?.length > 0);
    const hasAchievements = analysisData.achievement_emphasis?.length > 0;
    const hasKeywords = analysisData.keyword_optimization?.length > 0;
    const hasAnyData = hasImprovements || hasSkills || hasAchievements || hasKeywords;

    return (
        <div className="result-card analysis-section">
            <h3>📊 Analysis</h3>
            {hasAnyData ? (
                <div className="analysis-grid">
                    {/* Improvements */}
                    {hasImprovements && (
                        <div className="analysis-card-item improvements-card">
                            <h5>Improvements</h5>
                            <ul>
                                {analysisData.improvements.map((imp, index) => <li key={`imp-${index}`}>{imp}</li>)}
                            </ul>
                        </div>
                    )}

                    {/* Skills Analysis */}
                    {hasSkills && (
                        <div className="analysis-card-item skills-card"> {/* Added card wrapper */}
                            <RenderSkillsAnalysis skillsAnalysis={analysisData.skills_analysis} />
                        </div>
                    )}

                    {/* Achievement Emphasis */}
                    {hasAchievements && (
                        <div className="analysis-card-item achievement-card">
                            <h5>Achievement Emphasis</h5>
                            <ul>
                                {analysisData.achievement_emphasis.map((ach, index) => <li key={`ach-${index}`}>{ach}</li>)}
                            </ul>
                        </div>
                    )}

                    {/* Keyword Optimization */}
                    {hasKeywords && (
                        <div className="analysis-card-item keyword-card">
                            <h5>Keyword Optimization</h5>
                            <ul>
                                {analysisData.keyword_optimization.map((kw, index) => <li key={`kw-${index}`}>{kw}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <p>No specific analysis points generated.</p>
            )}
        </div>
    );
}

export default AnalysisDisplay;