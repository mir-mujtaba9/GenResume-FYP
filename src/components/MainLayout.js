// src/components/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Sidebar from './Sidebar';         // Import Sidebar
import Header from './Header';           // Assuming you want Header here too
import Footer from './Footer';           // Assuming you want Footer here too
// Import necessary CSS if applicable, e.g., a layout CSS file
// import '../styling/MainLayout.css';

function MainLayout() {
    return (
        <div className="app-layout"> {/* Optional: Add a wrapper div for layout styling */}
            {/* <Header /> */} {/* Include Header if it's part of the main layout */}
            <div className="layout-body" style={{ display: 'flex' }}> {/* Use flexbox for sidebar + content */}
                <Sidebar />
                <main className="main-content-area" style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
                    {/* Outlet renders the matched child route's element */}
                    <Outlet />
                </main>
            </div>
            {/* <Footer /> */} {/* Include Footer if it's part of the main layout */}
        </div>
    );
}

export default MainLayout;