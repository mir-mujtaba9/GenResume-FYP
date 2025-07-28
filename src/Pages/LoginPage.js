// src/Pages/LoginPage.js
import React, { useState } from "react";
import { Button, Form, Alert, Container, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchemas'; // Ensure this path is correct
import '../styling/LoginPage.css';
import Header from "../components/Header"; // Ensure this path is correct
import Footer from "../components/Footer"; // Ensure this path is correct
import BackgroundSVGs from "../components/BackgroundSVGs"; // Import the new component

function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' }
  });
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard"; // Default redirect

  const onSubmit = async (data) => {
    setServerError('');
    console.log('Attempting login with:', data.username);
    try {
      const response = await fetch('http://localhost:5000/api/login', { // Ensure URL is correct
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || `Login failed with status: ${response.status}`);
      }
      if (responseData.success && responseData.token) {
        localStorage.setItem('token', responseData.token);
        console.log('Login successful! Navigating to:', from);
        navigate(from, { replace: true });
      } else {
        throw new Error(responseData.message || 'Login failed: Unexpected response format.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setServerError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <section
        id="home"
        className="bg-gray-dark relative z-10 overflow-hidden min-h-screen"
      >
        <Container className="login-container d-flex align-items-center justify-content-center">
          <Card className="login-card bg-[#1B212D]">
            <Card.Body>
              <h1 className="text-[#4665E4] mb-4">Login</h1>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Username Input */}
                <Form.Group className="mb-3 text-white" controlId="loginUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className={`bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm ${errors.username ? 'is-invalid' : ''}`}
                    type="text" placeholder="Enter username"
                    {...register("username")} isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
                </Form.Group>
                {/* Password Input */}
                <Form.Group className="mb-3 text-white" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className={`bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm ${errors.password ? 'is-invalid' : ''}`}
                    type="password" placeholder="Enter password"
                    {...register("password")} isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                </Form.Group>
                {/* Server Error Alert */}
                {serverError && (<Alert variant="danger" onClose={() => setServerError('')} dismissible>{serverError}</Alert>)}
                {/* Submit Button */}
                <Button variant="primary" className="bg-[#4665E4] hover:bg-opacity-80 hover:bg-[#4665E4] text-white border-0 w-100" type="submit" disabled={isSubmitting} >
                  {isSubmitting ? (<><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /><span className="ms-2">Logging in...</span></>) : ('Login')}
                </Button>
              </Form>
              {/* Link to Register Page */}
              <div className="mt-3 text-center">
                <span className="text-gray-400">Don't have an account? </span>
                <Button variant="link" className="p-0 text-[#4665E4]" onClick={() => navigate('/RegisterPage')}>Register here</Button>
              </div>
            </Card.Body>
          </Card>
        </Container>

        {/* Render the background SVGs using the component */}
        <BackgroundSVGs />

      </section>
      <Footer />
    </>
  );
}

export default LoginPage;