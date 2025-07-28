// src/PagesContent/JobRecommendationPageContent.js
import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
    Alert,
    Form,
    InputGroup, // Keep InputGroup
    ButtonGroup
} from 'react-bootstrap';
// Import specific icons needed
import { FaSearch, FaFilter, FaSortAmountDown, FaTh, FaList, FaTimes } from 'react-icons/fa';

// --- Import the dedicated CSS file ---
import './JobRecommendationPageContent.css';

// --- Dummy Job Data (Keep as before) ---
const dummyJobs = [
    // ... (same dummy job data as previous example) ...
    { id: 1, title: 'Software Engineer', company: 'Techlogix Pakistan', location: 'Lahore', jobType: 'Full-time', experienceLevel: 'Mid-level', descriptionSnippet: 'Develop and maintain web applications using modern technologies. Strong problem-solving skills required.', jobUrl: '#', datePosted: '2025-04-10', matchScore: 0.9 },
    { id: 2, title: 'Frontend Developer (React)', company: 'Systems Limited', location: 'Islamabad', jobType: 'Full-time', experienceLevel: 'Entry-level', descriptionSnippet: 'Build responsive UI components using React. Collaborate with designers and backend developers.', jobUrl: '#', datePosted: '2025-04-09', matchScore: 0.8 },
    { id: 3, title: 'Data Scientist', company: 'Afiniti', location: 'Karachi', jobType: 'Full-time', experienceLevel: 'Senior', descriptionSnippet: 'Analyze large datasets, build machine learning models, and generate actionable insights for the business.', jobUrl: '#', datePosted: '2025-04-11', matchScore: 0.7 },
    { id: 4, title: 'Backend Developer (Node.js)', company: 'Arbisoft', location: 'Lahore', jobType: 'Full-time', experienceLevel: 'Mid-level', descriptionSnippet: 'Design and implement robust backend services, APIs, and database schemas. Experience with microservices is a plus.', jobUrl: '#', datePosted: '2025-04-08', matchScore: 0.85 },
    { id: 5, title: 'DevOps Engineer', company: 'Contour Software', location: 'Islamabad', jobType: 'Full-time', experienceLevel: 'Mid-level', descriptionSnippet: 'Manage CI/CD pipelines, cloud infrastructure (AWS/Azure), and ensure application reliability and scalability.', jobUrl: '#', datePosted: '2025-04-10', matchScore: 0.75 },
    { id: 6, title: 'QA Engineer', company: 'TRG Pakistan', location: 'Karachi', jobType: 'Full-time', experienceLevel: 'Entry-level', descriptionSnippet: 'Perform manual and automated testing, write test cases, and report bugs effectively.', jobUrl: '#', datePosted: '2025-04-07', matchScore: 0.6 },
    { id: 7, title: 'Project Manager', company: 'Netsol Technologies', location: 'Lahore', jobType: 'Full-time', experienceLevel: 'Senior', descriptionSnippet: 'Lead software development projects, manage timelines, resources, and stakeholder communication.', jobUrl: '#', datePosted: '2025-04-11', matchScore: 0.5 },
    { id: 8, title: 'UI/UX Designer', company: 'KeepTruckin (Motive)', location: 'Islamabad', jobType: 'Full-time', experienceLevel: 'Mid-level', descriptionSnippet: 'Create user-centered designs, wireframes, prototypes, and collaborate with product teams.', jobUrl: '#', datePosted: '2025-04-09', matchScore: 0.65 },
    { id: 9, title: 'Software Engineer Intern', company: 'Techlogix Pakistan', location: 'Lahore', jobType: 'Internship', experienceLevel: 'Internship', descriptionSnippet: 'Assist senior engineers with development tasks, learn coding best practices, and contribute to real projects.', jobUrl: '#', datePosted: '2025-04-10', matchScore: 0.95 },
    { id: 10, title: 'Remote Frontend Developer', company: 'Global Co.', location: 'Remote', jobType: 'Contract', experienceLevel: 'Mid-level', descriptionSnippet: 'Work on exciting projects from anywhere. Strong communication skills required.', jobUrl: '#', datePosted: '2025-04-05', matchScore: 0.8 },
    { id: 11, title: 'Full Stack Developer', company: 'Systems Limited', location: 'Islamabad', jobType: 'Full-time', experienceLevel: 'Mid-level', descriptionSnippet: 'Develop both frontend and backend components for various applications.', jobUrl: '#', datePosted: '2025-04-11', matchScore: 0.88 },
];
// --- End Dummy Data ---

const getUniqueValues = (items, key) => {
    return [...new Set(items.map(item => item[key]).filter(Boolean))].sort();
};

function JobRecommendationPageContent() {
    // State (keep all previous state: jobs, filters, sorting, viewMode etc.)
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [keywordFilter, setKeywordFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [jobTypeFilter, setJobTypeFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');
    const [sortBy, setSortBy] = useState('matchScore');
    const [viewMode, setViewMode] = useState('grid');

    const locations = useMemo(() => getUniqueValues(allJobs, 'location'), [allJobs]);
    const jobTypes = useMemo(() => getUniqueValues(allJobs, 'jobType'), [allJobs]);
    const experienceLevels = useMemo(() => getUniqueValues(allJobs, 'experienceLevel'), [allJobs]);

    // Simulate fetching data (keep as before)
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setAllJobs(dummyJobs);
            setFilteredJobs([...dummyJobs]);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Effect to apply filters and sorting (keep as before)
    useEffect(() => {
        let result = [...allJobs];
        // Keyword filter
        if (keywordFilter) {
            const lowerKeyword = keywordFilter.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(lowerKeyword) ||
                job.company.toLowerCase().includes(lowerKeyword) ||
                job.descriptionSnippet.toLowerCase().includes(lowerKeyword)
            );
        }
        // Dropdown filters
        if (locationFilter) result = result.filter(job => job.location === locationFilter);
        if (jobTypeFilter) result = result.filter(job => job.jobType === jobTypeFilter);
        if (experienceFilter) result = result.filter(job => job.experienceLevel === experienceFilter);
        // Sorting
        const sortJobs = (jobs, key) => { /* ... same sorting logic as before ... */
            const sorted = [...jobs];
            if (key === 'matchScore') sorted.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
            else if (key === 'datePosted') sorted.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
            else if (key === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title));
            return sorted;
        };
        setFilteredJobs(sortJobs(result, sortBy));
    }, [keywordFilter, locationFilter, jobTypeFilter, experienceFilter, sortBy, allJobs]);


    // --- Handlers (Updated Search Handling) ---
    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault(); // Prevent form submission if triggered by form
        setKeywordFilter(searchInput); // Apply the search input value to the actual filter
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value); // Update only the temporary search input state
    };

    const handleSearchInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(); // Trigger search on Enter key
        }
    };

    const handleResetFilters = () => {
        setSearchInput('');
        setKeywordFilter('');
        setLocationFilter('');
        setJobTypeFilter('');
        setExperienceFilter('');
        setSortBy('matchScore');
    };
    // --- End Handlers ---


    // --- Render Functions (Keep renderJobCard and renderJobListItem as before) ---
    const renderJobCard = (job) => (<Col key={job.id} xs={12} md={6} lg={4}> <Card className="h-100 job-card job-card-dark shadow-sm"> <Card.Body className="d-flex flex-column"> <Card.Title className="job-title">{job.title}</Card.Title> <Card.Subtitle className="mb-2 job-company">{job.company}</Card.Subtitle> <div className="job-details mb-3"> <span><strong>Location:</strong> {job.location}</span> <span><strong>Type:</strong> {job.jobType}</span> <span><strong>Level:</strong> {job.experienceLevel}</span> <span><strong>Posted:</strong> {job.datePosted}</span> </div> <Card.Text className="job-description-snippet flex-grow-1">{job.descriptionSnippet}</Card.Text> <Button variant="primary" href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="mt-auto align-self-start view-job-btn"> View Job </Button> </Card.Body> </Card> </Col>);
    const renderJobListItem = (job) => (<div key={job.id} className="job-list-item job-card-dark shadow-sm"> <Row className="align-items-center"> <Col md={8}> <h5 className="job-title mb-1">{job.title}</h5> <p className="job-company text-muted mb-1">{job.company}</p> <div className="job-details job-details-list mb-2"> <span><strong>Location:</strong> {job.location}</span> <span><strong>Type:</strong> {job.jobType}</span> <span><strong>Level:</strong> {job.experienceLevel}</span> <span><strong>Posted:</strong> {job.datePosted}</span> </div> </Col> <Col md={4} className="text-md-end mt-2 mt-md-0"> <Button variant="primary" href={job.jobUrl} target="_blank" rel="noopener noreferrer" size="sm" className="view-job-btn"> View Job </Button> </Col> </Row> </div>);
    // --- End Render Functions ---

    return (
        // Use a class for page specific styling if needed outside components
        <Container fluid className="job-recommendation-page">
            <h2 className="mb-4 page-title">Job Recommendations</h2>
            <p className="page-subtitle mb-4">
                Explore roles based on your profile. Use filters to narrow down your search.
            </p>

            {/* --- Filters Row (Updated Layout and Search) --- */}
            {/* Use onSubmit here to allow Enter key submission */}
            <Form onSubmit={handleSearchSubmit} className="mb-4 p-3 border rounded filter-form">
                {/* Use smaller gutters g-2 */}
                <Row className="g-2 align-items-end">
                    {/* Keyword Search - Takes more space */}
                    <Col xs={12} md={6} lg={5} xl={4}>
                        <Form.Group controlId="keywordSearch">
                            <Form.Label>Keyword Search</Form.Label>
                            {/* InputGroup with PREPENDED icon */}
                            <InputGroup>
                                <InputGroup.Text className="input-group-text-dark">
                                    <FaSearch />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search title, company, skill..."
                                    value={searchInput} // Controlled by searchInput state
                                    onChange={handleSearchInputChange} // Updates searchInput state
                                    onKeyDown={handleSearchInputKeyDown} // Handles Enter key
                                    className="form-control-dark"
                                />
                                {/* REMOVED separate search button */}
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    {/* Location Filter */}
                    <Col xs={6} sm={4} md={3} lg={2}>
                        <Form.Group controlId="locationFilter">
                            <Form.Label>Location</Form.Label>
                            <Form.Select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="form-select-dark">
                                <option value="">All Locations</option>
                                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Job Type Filter */}
                    <Col xs={6} sm={4} md={3} lg={2}>
                        <Form.Group controlId="jobTypeFilter">
                            <Form.Label>Job Type</Form.Label>
                            <Form.Select value={jobTypeFilter} onChange={(e) => setJobTypeFilter(e.target.value)} className="form-select-dark">
                                <option value="">All Types</option>
                                {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Experience Level Filter */}
                    <Col xs={6} sm={4} md={3} lg={2}>
                        <Form.Group controlId="experienceFilter">
                            <Form.Label>Experience</Form.Label>
                            <Form.Select value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)} className="form-select-dark">
                                <option value="">All Levels</option>
                                {experienceLevels.map(level => <option key={level} value={level}>{level}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Reset Button - Takes remaining space */}
                    <Col xs={6} sm={12} md> {/* Let it take remaining space on md+, stack below on sm */}
                        <Button variant="outline-secondary" onClick={handleResetFilters} className="w-100 reset-button">
                            <FaTimes className="me-1" /> Reset
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* --- View Toggle, Sorting and Results Count (Keep as before) --- */}
            <Row className="mb-3 align-items-center control-bar">
                <Col xs={12} sm={6} md={4} className="text-muted mb-2 mb-md-0"> <small>Showing {filteredJobs.length} of {allJobs.length} recommendations</small> </Col>
                <Col xs={12} sm={6} md={8} className="d-flex justify-content-sm-end align-items-center">
                    <ButtonGroup size="sm" className="me-3 view-toggle"> <Button variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'} onClick={() => setViewMode('grid')}><FaTh /></Button> <Button variant={viewMode === 'list' ? 'primary' : 'outline-secondary'} onClick={() => setViewMode('list')}><FaList /></Button> </ButtonGroup>
                    <Form.Group controlId="sortBy" className="d-flex align-items-center sort-control"> <Form.Label className="me-2 mb-0 text-nowrap"><small>Sort By:</small></Form.Label> <Form.Select size="sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-select-dark"> <option value="matchScore">Relevance</option> <option value="datePosted">Date Posted</option> <option value="title">Job Title</option> </   Form.Select> </Form.Group>
                </Col>
            </Row>


            {/* --- Loading / Error / Results (Keep as before) --- */}
            {loading ? (<div className="text-center p-5 loading-indicator"> <Spinner animation="border" variant="primary" role="status" /> <p className="mt-2">Loading recommendations...</p> </div>
            ) : error ? (<Alert variant="danger" className="alert-dark-theme">{error}</Alert>
            ) : (viewMode === 'grid' ? (filteredJobs.length > 0 ? (<Row xs={1} md={2} lg={3} className="g-4"> {filteredJobs.map(renderJobCard)} </Row>) : (<Alert variant="info" className="text-center alert-dark-theme"> No job recommendations match filters. </Alert>)
            ) : (filteredJobs.length > 0 ? (<div className="job-list-view"> {filteredJobs.map(renderJobListItem)} </div>) : (<Alert variant="info" className="text-center alert-dark-theme"> No job recommendations match filters. </Alert>)
            ))}
        </Container>
    );
}

export default JobRecommendationPageContent;