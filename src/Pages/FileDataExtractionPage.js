import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const FileDataExtractionPage = ({ onExtract }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
        setSuccessMessage('');
    };

    // Parse the uploaded file
    const handleFileUpload = () => {
        if (!file) {
            setError('Please select a file.');
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result); // Assuming the file is in JSON format
                onExtract(data); // Pass extracted data to parent component
                setSuccessMessage('File data extracted successfully!');
            } catch (err) {
                setError('Failed to parse file. Ensure it is a valid JSON file.');
            }
        };

        reader.onerror = () => {
            setError('Error reading file. Please try again.');
        };

        reader.readAsText(file);
    };

    return (
        <div className="file-data-extraction-container">
            <h4>Upload and Extract Data</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose a JSON File</Form.Label>
                <Form.Control type="file" accept=".json" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleFileUpload}>
                Upload and Extract
            </Button>
        </div>
    );
};

export default FileDataExtractionPage;
