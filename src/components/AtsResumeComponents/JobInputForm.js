// src/components/AtsResumeComponents/JobInputForm.js
import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

function JobInputForm({
    formData,
    selectedFile,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
}) {
    return (
        <Form onSubmit={handleSubmit}>
            {/* Job Description Input */}
            <div className="form-section">
                <Form.Group controlId="formJobDescription">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={8}
                        placeholder="Paste the job description here..."
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChange}
                        className="form-input-textarea" // Styled by ATSResume.css
                        required
                        disabled={loading} // Disable during loading
                    />
                </Form.Group>
            </div>

            {/* Resume Upload Input */}
            <div className="form-section">
                <Form.Group controlId="formResumeUpload">
                    <Form.Label>Upload Resume (PDF only)</Form.Label>
                    <div className="file-upload-wrapper">
                        <label htmlFor="fileUpload" className={`file-upload-label btn btn-secondary ${loading ? 'disabled' : ''}`}>
                            {selectedFile ? 'Change File' : 'Choose File'}
                        </label>
                        <input
                            id="fileUpload"
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="file-upload-input" // Hidden input
                            required={!selectedFile} // Only required if no file is selected yet
                            style={{ display: 'none' }}
                            disabled={loading} // Disable during loading
                        />
                        {selectedFile && !loading && ( // Don't show filename if loading (optional)
                            <span className="file-name-display">
                                Selected: <strong>{selectedFile.name}</strong>
                            </span>
                        )}
                        {loading && selectedFile && ( // Show loading state for file (optional)
                            <span className="file-name-display text-muted">
                                Processing: <strong>{selectedFile.name}</strong>
                            </span>
                        )}
                    </div>
                </Form.Group>
            </div>

            {/* Submit Button */}
            <Button className="submit-button" variant="primary" type="submit" disabled={loading}>
                {loading ? (
                    <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Generating...</span>
                    </>
                ) : (
                    'Generate ATS Compliant Resume'
                )}
            </Button>
        </Form>
    );
}

export default JobInputForm;