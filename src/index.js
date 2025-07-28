// src/index.js

import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalWorkerOptions } from 'pdfjs-dist';

// --- Page Imports ---
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import ProfilePage from './Pages/ProfilePage';
// import ViewProfilePage from './Pages/ViewProfilePage'; // <-- REMOVE THIS IMPORT
import ResumeGenerationPage from './Pages/ResumeGenerationPage';
import CoverLetterPage from './Pages/CoverLetterPage';
import JobRecommendationPage from './Pages/JobRecommendationPage';
import CareerPathGuidancePage from './Pages/CareerPathGuidancePage';
import SkillsGapAnalysisPage from './Pages/SkillsGapAnalysisPage';
import ATSResumePage from './Pages/ATSResumePage';
import ProfileInfoPage from './Pages/ProfileInfoPage'; // Keep this
import TestPage from './Pages/TestPage'

// --- Import ProtectedRoute ---
import ProtectedRoute from './components/ProtectedRoute'; // Adjust path if needed

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// PDF Worker setup
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.7.76/pdf.worker.min.js`;


const router = createBrowserRouter([
  // --- Public Routes ---
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/RegisterPage", element: <RegisterPage /> },
  { path: "/test", element: <TestPage /> },

  // --- Protected Routes ---
  {
    path: "/dashboard",
    element: (<ProtectedRoute> <DashboardPage /> </ProtectedRoute>),
  },
  {
    path: "/profile", // The EDIT page
    element: (<ProtectedRoute> <ProfilePage /> </ProtectedRoute>),
  },
  // { // --- REMOVE THE /view-profile ROUTE DEFINITION ---
  //   path: "/view-profile",
  //   element: ( <ProtectedRoute> <ViewProfilePage /> </ProtectedRoute> ),
  // },
  {
    path: "/profile-info", // Keep this route, ensure it's protected
    element: (
      <ProtectedRoute>
        <ProfileInfoPage />
        {/* Note: ProfileInfoPage likely just renders Sidebar which then renders ProfileInfoPageContent */}
        {/* If ProfileInfoPage renders the Sidebar, this setup is correct. */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/resume-generation",
    element: (<ProtectedRoute> <ResumeGenerationPage /> </ProtectedRoute>),
  },
  {
    path: "/job-search-filter", // Match the path used in Sidebar.js link
    element: (<ProtectedRoute> <DashboardPage /> </ProtectedRoute>), // Render the main dashboard layout
  },
  {
    path: "/cover-letter",
    element: (<ProtectedRoute> <CoverLetterPage /> </ProtectedRoute>),
  },
  {
    path: "/job-recommendation",
    element: (<ProtectedRoute> <JobRecommendationPage /> </ProtectedRoute>)
  },
  {
    path: "/career-path-guidance",
    element: (<ProtectedRoute> <CareerPathGuidancePage /> </ProtectedRoute>)
  },
  {
    path: "/skills-gap-analysis",
    element: (<ProtectedRoute> <SkillsGapAnalysisPage /> </ProtectedRoute>)
  },
  {
    path: "/ats-resume",
    element: (<ProtectedRoute> <ATSResumePage /> </ProtectedRoute>)
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);