// src/components/AtsResumeComponents/TextResultDisplay.js
import React from 'react';

function TextResultDisplay({ title, data, placeholderText, emoji }) {
    return (
        <div className="result-card text-result-section"> {/* Added common class */}
            <h3>{emoji} {title}</h3>
            <pre className="formatted-text-output">
                {data || placeholderText || `No ${title} data available.`}
            </pre>
        </div>
    );
}

export default TextResultDisplay;