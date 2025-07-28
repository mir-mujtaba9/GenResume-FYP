import React from 'react'

function CoverLetterPageContent() {
  return (
    <div>CoverLetterPageContent</div>
  )
}

export default CoverLetterPageContent
// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import '../styling/CoverLetterContent.css';

// function CoverLetterPageContent() {
  
//     const [formData, setFormData] = useState({
//         jobDescription: '',
//     });

//     const [errorMessage, setErrorMessage] = useState('');

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Form validation
//     const validateForm = () => {
//         if (!formData.jobDescription) {
//             setErrorMessage('Please provide a job description.');
//             return false;
//         }
//         setErrorMessage('');
//         return true;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         validateForm();
//     };

//     // Placeholder functions for new buttons
//     const handleEditResume = () => {
//         // Logic for editing the resume goes here
//         console.log("Edit Resume clicked");
//     };

//     const handleDownloadResume = () => {
//         // Logic for downloading the resume goes here
//         console.log("Download Resume clicked");
//     };

//     const handleViewSavedResume = () => {
//         // Logic for viewing saved resume goes here
//         console.log("View Saved Resume clicked");
//     };

//     return (
//         <div className="resume-form-container">
//             <Form onSubmit={handleSubmit}>
//                 {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
//                 <h1>Resume Generation</h1>

//                 <div className="form-section">
//                     <h3>Job Description</h3>
//                     <Form.Group controlId="formJobDescription">
//                         <Form.Label>Describe the job:</Form.Label>
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Enter the job description"
//                             name="jobDescription"
//                             value={formData.jobDescription}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <Button className="mt-3" variant="primary" type="submit">
//                     Generate Cover Letter
//                 </Button>
//             </Form>

//             {/* New div with buttons for editing, downloading, and viewing saved resume */}
//             <div className="button-container mt-4">
//                 <Button variant="secondary" onClick={handleEditResume}>
//                     Edit Cover Letter
//                 </Button>
//                 <Button variant="secondary" className="ml-2" onClick={handleDownloadResume}>
//                     Download Cover Letter
//                 </Button>
//                 <Button variant="secondary" className="ml-2" onClick={handleViewSavedResume}>
//                     View Saved Cover Letter
//                 </Button>
//             </div>
//         </div>
//   )
// }

// export default CoverLetterPageContent


// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import '../styling/CoverLetterContent.css';

// function CoverLetterPageContent() {
  
//     const [formData, setFormData] = useState({
//         jobDescription: '',
//     });

//     const [errorMessage, setErrorMessage] = useState('');

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Form validation
//     const validateForm = () => {
//         if (!formData.jobDescription) {
//             setErrorMessage('Please provide a job description.');
//             return false;
//         }
//         setErrorMessage('');
//         return true;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         validateForm();
//     };

//     // Placeholder functions for new buttons
//     const handleEditResume = () => {
//         // Logic for editing the resume goes here
//         console.log("Edit Resume clicked");
//     };

//     const handleDownloadResume = () => {
//         // Logic for downloading the resume goes here
//         console.log("Download Resume clicked");
//     };

//     const handleViewSavedResume = () => {
//         // Logic for viewing saved resume goes here
//         console.log("View Saved Resume clicked");
//     };

//     return (
//         <div className="resume-form-container">
//             <Form onSubmit={handleSubmit}>
//                 {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
//                 <h1>Resume Generation</h1>

//                 <div className="form-section">
//                     <h3>Job Description</h3>
//                     <Form.Group controlId="formJobDescription">
//                         <Form.Label>Describe the job:</Form.Label>
//                         <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Enter the job description"
//                             name="jobDescription"
//                             value={formData.jobDescription}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                 </div>

//                 <Button className="mt-3" variant="primary" type="submit">
//                     Generate Cover Letter
//                 </Button>
//             </Form>

//             {/* New div with buttons for editing, downloading, and viewing saved resume */}
//             <div className="button-container mt-4">
//                 <Button variant="secondary" onClick={handleEditResume}>
//                     Edit Cover Letter
//                 </Button>
//                 <Button variant="secondary" className="ml-2" onClick={handleDownloadResume}>
//                     Download Cover Letter
//                 </Button>
//                 <Button variant="secondary" className="ml-2" onClick={handleViewSavedResume}>
//                     View Saved Cover Letter
//                 </Button>
//             </div>
//         </div>
//   )
// }

// export default CoverLetterPageContent


// // import React, { useState } from 'react';
// // import { Form, Button, Alert } from 'react-bootstrap';
// // import '../styling/CoverLetterContent.css';

// // function CoverLetterPageContent() {
  
// //     const [formData, setFormData] = useState({
// //         jobDescription: '',
// //     });

// //     const [errorMessage, setErrorMessage] = useState('');

// //     // Handle input changes
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData({
// //             ...formData,
// //             [name]: value,
// //         });
// //     };

// //     // Form validation
// //     const validateForm = () => {
// //         if (!formData.jobDescription) {
// //             setErrorMessage('Please provide a job description.');
// //             return false;
// //         }
// //         setErrorMessage('');
// //         return true;
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         validateForm();
// //     };

// //     // Placeholder functions for new buttons
// //     const handleEditResume = () => {
// //         // Logic for editing the resume goes here
// //         console.log("Edit Resume clicked");
// //     };

// //     const handleDownloadResume = () => {
// //         // Logic for downloading the resume goes here
// //         console.log("Download Resume clicked");
// //     };

// //     const handleViewSavedResume = () => {
// //         // Logic for viewing saved resume goes here
// //         console.log("View Saved Resume clicked");
// //     };

// //     return (
// //         <div className="resume-form-container">
// //             <Form onSubmit={handleSubmit}>
// //                 {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
// //                 <h1>Resume Generation</h1>

// //                 <div className="form-section">
// //                     <h3>Job Description</h3>
// //                     <Form.Group controlId="formJobDescription">
// //                         <Form.Label>Describe the job:</Form.Label>
// //                         <Form.Control
// //                             as="textarea"
// //                             rows={3}
// //                             placeholder="Enter the job description"
// //                             name="jobDescription"
// //                             value={formData.jobDescription}
// //                             onChange={handleChange}
// //                         />
// //                     </Form.Group>
// //                 </div>

// //                 <Button className="mt-3" variant="primary" type="submit">
// //                     Generate Cover Letter
// //                 </Button>
// //             </Form>

// //             {/* New div with buttons for editing, downloading, and viewing saved resume */}
// //             <div className="button-container mt-4">
// //                 <Button variant="secondary" onClick={handleEditResume}>
// //                     Edit Cover Letter
// //                 </Button>
// //                 <Button variant="secondary" className="ml-2" onClick={handleDownloadResume}>
// //                     Download Cover Letter
// //                 </Button>
// //                 <Button variant="secondary" className="ml-2" onClick={handleViewSavedResume}>
// //                     View Saved Cover Letter
// //                 </Button>
// //             </div>
// //         </div>
// //   )
// // }

// // export default CoverLetterPageContent

