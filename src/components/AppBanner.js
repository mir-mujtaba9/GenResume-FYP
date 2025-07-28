import React from "react";
// import {  Button } from 'react-bootstrap';
// import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppBanner(){
    return (
        <div className="career-start-section">
        <h1>Start your Career</h1>
            <div className="button-group">
                <Link to="./LoginPage" className="btn btn-outline-success me-2">Login</Link>
                <Link to="./RegisterPage" className="btn btn-outline-success">Register</Link>
            </div>
        </div>
    );
}

export default AppBanner;