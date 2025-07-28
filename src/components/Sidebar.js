// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// Import necessary icons, including FaFilter
import { FaUser, FaFileAlt, FaBriefcase, FaChartBar, FaUserPlus, FaSignOutAlt, FaEdit, FaFilter } from 'react-icons/fa';

// --- Import Page Content Components ---
// Ensure these paths are correct for your project structure
import ProfilePageContent from '../PagesContent/ProfilePageContent';
import ResumeGenerationPageContent from '../PagesContent/ResumeGenerationPageContent';
import JobRecommendation from '../PagesContent/JobRecommendation.js'; // <<< Component fetching API data
import JobRecommendationPageContent from '../PagesContent/JobRecommendationPageContent.js'; // <<< Component with Filters UI
import SkillGapAnalysisContent from '../PagesContent/SkillGapAnalysisContent';
import ATSResumePageContent from '../PagesContent/ATSResumePageContent';
import ProfileInfoPageContent from '../PagesContent/ProfileInfoPageContent';

// --- Verify logo path ---
import logo from "./logo1.png";

// Styling Imports (ensure paths are correct)
import "../styling/logostyling.css";
import '../styling/Dashboard.css';

// --- Updated Sidebar Links ---
const sidebarLinks = [
    { path: '/profile-info', text: 'Profile Info', icon: FaUser },
    { path: '/profile', text: 'Edit Profile', icon: FaEdit },
    { path: '/resume-generation', text: 'Resume Generation', icon: FaFileAlt },
    // Link to the component directly hitting the API (simpler view perhaps)
    { path: '/job-recommendation', text: 'Job Recommendations', icon: FaBriefcase },
    // Link to the component with the advanced filter UI
    // { path: '/job-search-filter', text: 'Job Search & Filter', icon: FaFilter }, // <<< New path and text
    { path: '/skills-gap-analysis', text: 'Skills Gap Analysis', icon: FaChartBar },
    { path: '/ats-resume', text: 'ATS Compliant Resume', icon: FaFileAlt },
];
// --- End Updated Sidebar Links ---

function Sidebar() {
    // State and hooks (keep as before)
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => { /* ... keep useEffect logic ... */
        const handleResize = () => { const m = window.innerWidth <= 768; setIsMobile(m); if (!m && isSidebarOpen) { setSidebarOpen(false); } }; window.addEventListener('resize', handleResize); handleResize(); return () => window.removeEventListener('resize', handleResize);
    }, [isSidebarOpen]);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const handleLinkClick = () => { if (isMobile && isSidebarOpen) { setSidebarOpen(false); } };
    const handleLogout = () => { localStorage.removeItem('authToken'); navigate('/login'); if (isSidebarOpen) setSidebarOpen(false); };
    const renderToggleButton = () => { if (isMobile) { return (<button className={`menu-toggle ${isSidebarOpen ? 'menu-toggle-hidden' : ''}`} onClick={toggleSidebar} aria-label="Open sidebar" aria-expanded={isSidebarOpen}>☰</button>); } return null; };


    // --- Updated renderContent function ---
    const renderContent = () => {
        switch (location.pathname) {
            case '/profile': return <ProfilePageContent />;
            case '/profile-info': return <ProfileInfoPageContent />;
            case '/resume-generation': return <ResumeGenerationPageContent />;
            // --- Updated Job Rec Cases ---
            case '/job-recommendation': return <JobRecommendation />; // <<< Renders the API component
            case '/job-search-filter': return <JobRecommendationPageContent />; // <<< Renders the Filter UI component
            // --- End Updated Job Rec Cases ---
            case '/skills-gap-analysis': return <SkillGapAnalysisContent />;
            case '/ats-resume': return <ATSResumePageContent />;
            default:
                // Welcome Content
                return (<div className="welcome-content"> <img className="logo-image welcome-logo" src={logo} alt="GenResume Logo" /> <h1 className="welcome-header">AI-Driven Resume Generation</h1> <h1 className="welcome-header">Job Matching Platform</h1> <p className="welcome-subtext">Select an option from the sidebar.</p> </div>);
        }
    };
    // --- End Updated renderContent function ---

    // JSX structure (keep as before)
    return (
        <div className="dashboard">
            {renderToggleButton()}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
                {isMobile && (<button className="close-btn" onClick={toggleSidebar} aria-label="Close sidebar">✕</button>)}
                <h2 className="sidebar-title">GenResume</h2>
                <ul className="sidebar-links">
                    {sidebarLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink to={link.path} className={({ isActive }) => isActive ? 'active' : ''} onClick={handleLinkClick}>
                                <link.icon className="sidebar-icon" /> {link.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <Button variant="danger" className="logout-button w-100" onClick={handleLogout}>
                    <FaSignOutAlt className="sidebar-icon" /> Logout
                </Button>
            </div>
            <div className={`main-content-area ${!isMobile ? 'desktop-main' : ''}`}>
                {renderContent()}
            </div>
        </div>
    );
}

export default Sidebar;