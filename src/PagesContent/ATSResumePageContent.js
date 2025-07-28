// src/PagesContent/SkillGapAnalysisContent.js (or your original file path)
import React, { useState } from "react";
import { Alert } from "react-bootstrap"; // Removed Form, Button, Spinner imports as they are in JobInputForm

// Import the new components
import JobInputForm from '../components/AtsResumeComponents/JobInputForm';
import ResultsTabs from '../components/AtsResumeComponents/ResultsTabs';
import AnalysisDisplay from '../components/AtsResumeComponents/AnalysisDisplay';
import AtsScoreDisplay from '../components/AtsResumeComponents/AtsScoreDisplay';
import TextResultDisplay from '../components/AtsResumeComponents/TextResultDisplay';

// Ensure this path is correct for your project structure
import "../styling/ATSResume.css";

function SkillGapAnalysisContent() {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({ jobDescription: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [activeSection, setActiveSection] = useState("");

  // Extracted data states
  const [analysisData, setAnalysisData] = useState({});
  const [atsScore, setAtsScore] = useState(null);
  const [coldEmail, setColdEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [tailoredResume, setTailoredResume] = useState("");

  // Button enabled state (could potentially be derived from apiResponse != null)
  const [buttonsEnabled, setButtonsEnabled] = useState({
    analysis: false, atsScore: false, coldEmail: false, coverLetter: false, tailoredResume: false,
  });

  // --- EVENT HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setErrorMessage("");
    } else if (file) {
      setErrorMessage("Please upload a valid PDF file.");
      setSelectedFile(null);
      event.target.value = null;
    } else {
      setSelectedFile(null);
    }
  };

  // --- FORM VALIDATION & SUBMISSION ---
  const validateForm = () => {
    if (!formData.jobDescription.trim()) {
      setErrorMessage("Please provide a job description.");
      return false;
    }
    if (!selectedFile) {
      setErrorMessage("Please upload your resume as a PDF file.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setActiveSection("");
      setApiResponse(null);
      setAnalysisData({});
      setAtsScore(null);
      setColdEmail("");
      setCoverLetter("");
      setTailoredResume("");
      setButtonsEnabled({ analysis: false, atsScore: false, coldEmail: false, coverLetter: false, tailoredResume: false });
      setErrorMessage(""); // Clear previous errors on new submit

      try {
        // const apiUrl = "https://6546-154-192-46-57.ngrok-free.app/tailor_resume"; // Replace with your actual API endpoint or env variable
        const apiUrl = "http://127.0.0.1:8000/tailor_resume"; // Replace with your actual API endpoint or env variable
        const formDataToSend = new FormData();
        formDataToSend.append("job_description", formData.jobDescription);
        formDataToSend.append("resume", selectedFile);

        const response = await fetch(apiUrl, {
          method: "POST",
          body: formDataToSend,
        });

        if (!response.ok) {
          let errorText = `API Error: ${response.status} ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorText = errorData.detail || errorData.message || errorText;
          } catch (parseError) { /* Ignore */ }
          throw new Error(errorText);
        }

        const data = await response.json();
        console.log("API Response:", data);

        setApiResponse(data);
        setAnalysisData(data.analysis || {});
        setTailoredResume(data.tailored_resume || "");
        setCoverLetter(data.cover_letter || "");
        setColdEmail(data.cold_email || "");
        setAtsScore(data.ats_score || null);

        setButtonsEnabled({ analysis: true, atsScore: true, coldEmail: true, coverLetter: true, tailoredResume: true });
        setActiveSection("analysis"); // Show analysis first by default

      } catch (error) {
        console.error("API Call Failed:", error);
        setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
        setApiResponse(null);
      } finally {
        setLoading(false);
      }
    }
  };

  // --- RENDER LOGIC ---
  const renderActiveSection = () => {
    if (!apiResponse || loading) return null; // Don't render sections if no response or loading

    switch (activeSection) {
      case "analysis":
        // Only render if analysisData exists (even if empty, component handles that)
        return analysisData ? <AnalysisDisplay analysisData={analysisData} /> : null;
      case "atsScore":
        return atsScore ? <AtsScoreDisplay atsScore={atsScore} /> : null;
      case "tailoredResume":
        return <TextResultDisplay title="Tailored Resume" data={tailoredResume} emoji="📄" />;
      case "coverLetter":
        return <TextResultDisplay title="Cover Letter" data={coverLetter} emoji="📝" />;
      case "coldEmail":
        return <TextResultDisplay title="Cold Email" data={coldEmail} emoji="📩" />;
      default:
        // Optionally show a placeholder or the first available section if none is active?
        // For now, show nothing if no section is active.
        // Or show analysis by default if apiResponse exists but activeSection is somehow empty
        // if (apiResponse && analysisData) {
        //     return <AnalysisDisplay analysisData={analysisData} />;
        // }
        return null;
    }
  };

  // --- JSX ---
  return (
    <div className="resume-form-container">
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible className="fade-in">
          {errorMessage}
        </Alert>
      )}

      <h1 className="main-title">ATS Compliant Resume</h1>

      {/* Render the Input Form Component */}
      <JobInputForm
        formData={formData}
        selectedFile={selectedFile}
        loading={loading}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />

      {/* Results Section - Conditionally Rendered */}
      {apiResponse && !loading && (
        <div className="results-section fade-in">
          <h2 className="results-title">Results</h2>

          {/* Render the Results Tabs Component */}
          <ResultsTabs
            buttonsEnabled={buttonsEnabled}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Display Area for Selected Section Content */}
          <div className="result-content-area">
            {renderActiveSection()}
          </div>

          {/* Message if API responded but no section is active (or selected section has no data) */}
          {activeSection && !renderActiveSection() && (
            <div className="result-card">
              <p>No data available for the selected section.</p>
            </div>
          )}
        </div>
      )}

      {/* Optional: Show message if API responded but no active section set (initial state after load) */}
      {!loading && apiResponse && !activeSection && (
        <div className="results-section fade-in">
          <h2 className="results-title">Results</h2>
          <p className="text-center text-secondary">Processing complete. Select a category above to view results.</p>
        </div>
      )}

    </div>
  );
}

export default SkillGapAnalysisContent;