import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button, // Use Button from react-bootstrap
  Spinner,
  Alert // Use Alert from react-bootstrap
} from 'react-bootstrap';

// IMPORTANT: Move your API Key to an environment variable!
// Create a .env file in your project root (add it to .gitignore!)
// Add this line to .env: REACT_APP_SCRAPINGDOG_API_KEY=your_actual_api_key
const SCRAPINGDOG_API_KEY = process.env.REACT_APP_SCRAPINGDOG_API_KEY;

function JobRecommendationTool() { // Renamed for clarity
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Basic check if the API key is available
    // if (!SCRAPINGDOG_API_KEY) {
    //   setError("API Key for ScrapingDog is missing. Please configure it in your environment variables.");
    //   setLoading(false);
    //   return;
    // }

    const fetchJobs = async () => {
      setLoading(true);
      setError(null); // Reset error on new fetch

      // Define parameters (Consider making these dynamic in a real application)
      const params = new URLSearchParams({
        api_key: "67f8c62d9d11da85a59d378f",
        field: "python", // Example: could be dynamic
        geoid: "100293800", // Example: could be dynamic
        page: '2'
      });

      const url = `https://api.scrapingdog.com/linkedinjobs/?${params.toString()}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          // Try to get more specific error info if possible
          let errorDetails = `HTTP error ${response.status}`;
          try {
            const errorData = await response.json();
            errorDetails += `: ${errorData.message || JSON.stringify(errorData)}`;
          } catch (e) { /* Ignore if response body isn't JSON */ }
          throw new Error(`Failed to fetch jobs. ${errorDetails}`);
        }

        const data = await response.json();

        // Check if data is an array before setting state
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.warn("API did not return an array:", data);
          setJobs([]); // Set to empty array if response is not as expected
          // Optionally set an error message here too
          // setError("Received unexpected data format from the API.");
        }

      } catch (error) {
        console.error("Error fetching job recommendations:", error);
        setError(error.message || "An error occurred while fetching jobs. Please try again later.");
        setJobs([]); // Clear jobs on error
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this runs once on mount

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading job recommendations...</span>
          </Spinner>
          <p className="mt-2">Loading job recommendations...</p>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      );
    }

    if (jobs.length === 0) {
      return (
        <Alert variant="info" className="text-center">
          No job recommendations found matching the criteria (Python in GeoID 100293800).
        </Alert>
      );
    }

    // Display Jobs using react-bootstrap Cards
    return (
      <Row xs={1} md={2} lg={3} className="g-4"> {/* Responsive grid with gutters */}
        {jobs.map((job, index) => (
          // Ensure job_link or a unique ID exists for the key if possible
          <Col key={job.job_link || index}>
            {/* Use react-bootstrap Card */}
            <Card className="h-100 shadow-sm bg-light bg-opacity-10 border-secondary">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-2">{job.job_position || 'N/A'}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.company_name || 'N/A'}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">
                  <small>
                    <strong>Location:</strong> {job.job_location || 'N/A'}
                  </small>
                  {/* Add other details if available e.g., job_snippet */}
                  {job.job_snippet && <p className="mt-2 fst-italic">{job.job_snippet}</p>}
                </Card.Text>
                <Button
                  variant="outline-primary" // Consistent button style
                  href={job.job_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  disabled={!job.job_link} // Disable if no link
                  className="mt-auto" // Pushes button to bottom
                >
                  {job.job_link ? 'View Job on LinkedIn' : 'Link Unavailable'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };


  return (
    // Apply dark theme and consistent container styling
    <Container data-bs-theme="dark" className="py-4 px-md-5 rounded-3 bg-dark text-light" style={{ border: '1px solid #333', minHeight: '80vh' }}>
      <h1 className="text-center mb-4">Job Recommendations</h1>
      <p className="lead text-center text-muted mb-4">
        Showing potential job matches based on predefined criteria (Python roles).
      </p>

      {renderContent()}

    </Container>
  );
}

export default JobRecommendationTool;