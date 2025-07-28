// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        // User not logged in
        console.log('ProtectedRoute: No token found, redirecting to login.');
        // Redirect to login, saving the current location they tried to access
        return <Navigate to="/login" state={{ from: location }} replace />;
        // 'replace' avoids adding the login route to the history stack
    }

    // User is logged in, render the requested component
    return children;
};

export default ProtectedRoute;