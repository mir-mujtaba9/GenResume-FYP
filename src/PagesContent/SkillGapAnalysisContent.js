import React, { useState } from 'react';
import {
    Form,
    Button,
    Alert,
    Spinner,
    Container,
    Row,
    Col,
    Card,
    ListGroup
} from 'react-bootstrap';

// Optional: Define reusable styles or move to a CSS file
const scrollableListStyle = {
    maxHeight: '300px',
    overflowY: 'auto',
};

function SkillGapAnalysisTool() {
    const [formData, setFormData] = useState({
        jobDescription: '',
        resumeText: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null); // Store all results together
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.jobDescription.trim()) {
            setErrorMessage('Please provide the job description.');
            setAnalysisResult(null); // Clear previous results on validation error
            return false;
        }
        if (!formData.resumeText.trim()) {
            setErrorMessage('Please paste your resume text.');
            setAnalysisResult(null); // Clear previous results
            return false;
        }
        setErrorMessage(''); // Clear error message if validation passes
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        setLoading(true);
        setAnalysisResult(null); // Clear previous results before new request
        setErrorMessage('');    // Clear previous errors

        try {
            const apiUrl = 'https://f964-34-87-172-34.ngrok-free.app/compare_skills'; // Use your actual API endpoint

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other necessary headers like Authorization if needed
                },
                // Ensure the keys match exactly what the backend expects
                body: JSON.stringify({
                    job_text: formData.jobDescription,
                    resume_text: formData.resumeText,
                }),
            });

            if (!response.ok) {
                // Try to get error details from response body if possible
                let errorData;
                try {
                    errorData = await response.json();
                } catch (parseError) {
                    // Ignore if response is not JSON
                }
                const errorDetail = errorData?.detail || `HTTP error ${response.status}`;
                throw new Error(`Failed to fetch skills: ${errorDetail}. Please check the inputs or try again later.`);
            }

            const data = await response.json();

            // Store the relevant parts of the API response
            setAnalysisResult({
                candidateSkills: data.candidate_SKILLS || [],
                requiredSkills: data.job_SKILLS || [],
                missingSkills: data.MISSING_SKILLS || [],
            });

        } catch (error) {
            console.error("API Request Error:", error); // Log the full error for debugging
            setErrorMessage(error.message || 'An unexpected error occurred.'); // Display user-friendly message
            setAnalysisResult(null); // Ensure results are cleared on error
        } finally {
            setLoading(false);
        }
    };

    // Helper component for rendering skill lists
    const SkillListCard = ({ title, skills, variant }) => (
        <Card className={`mb-3 bg-${variant}-subtle`}> {/* Use subtle background variants */}
            <Card.Header as="h5" className={`text-${variant}-emphasis`}>{title}</Card.Header> {/* Emphasized text */}
            <ListGroup variant="flush" style={scrollableListStyle}>
                {skills && skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <ListGroup.Item key={index} className={`bg-${variant}-subtle`}> {/* Match background */}
                            {skill}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className={`bg-${variant}-subtle`}>No skills listed.</ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    );


    return (
        // Apply dark theme to the container
        <Container data-bs-theme="dark" className="py-4 px-md-5 rounded-3 bg-dark text-light" style={{ border: '1px solid #333' }}>
            <h1 className="mb-4 text-center">Skill Gap Analysis</h1>
            <p className="lead mb-4 text-center text-muted">
                Paste the job description and your resume below to identify skill matches and gaps.
            </p>

            <Form onSubmit={handleSubmit}>
                {/* Error Alert - Placed prominently */}
                {errorMessage && (
                    <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible className="mb-4">
                        {errorMessage}
                    </Alert>
                )}

                <Row>
                    {/* Job Description Input */}
                    <Col md={6} className="mb-3 mb-md-0">
                        <Form.Group controlId="formJobDescription">
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10} // Adjusted rows
                                placeholder="Paste the full job description here..."
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleChange}
                                required // Basic HTML5 validation
                                className="bg-light bg-opacity-10 border-secondary" // Subtle background, distinct border
                            />
                        </Form.Group>
                    </Col>

                    {/* Resume Text Input */}
                    <Col md={6}>
                        <Form.Group controlId="formResumeText">
                            <Form.Label>Your Resume Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10} // Adjusted rows
                                placeholder="Paste your full resume text here..."
                                name="resumeText"
                                value={formData.resumeText}
                                onChange={handleChange}
                                required // Basic HTML5 validation
                                className="bg-light bg-opacity-10 border-secondary" // Subtle background, distinct border
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Submit Button */}
                <div className="text-center mt-4">
                    <Button variant="primary" type="submit" disabled={loading} size="lg">
                        {loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                Analyzing...
                            </>
                        ) : (
                            'Analyze Skills'
                        )}
                    </Button>
                </div>
            </Form>

            {/* Results Section */}
            {analysisResult && (
                <div className="mt-5">
                    <h2 className="mb-4 text-center">Analysis Results</h2>
                    <Row>
                        <Col md={4}>
                            {/* Use the helper component */}
                            <SkillListCard title="Your Skills (from Resume)" skills={analysisResult.candidateSkills} variant="success" />
                        </Col>
                        <Col md={4}>
                            <SkillListCard title="Required Skills (from Job)" skills={analysisResult.requiredSkills} variant="info" />
                        </Col>
                        <Col md={4}>
                            <SkillListCard title="Missing Skills" skills={analysisResult.missingSkills} variant="danger" />
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );
}

export default SkillGapAnalysisTool;