// src/Pages/RegisterPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/authSchemas'; // Ensure this path is correct
import '../styling/Registration.css';
import Header from '../components/Header'; // Ensure this path is correct
import Footer from '../components/Footer'; // Ensure this path is correct
import BackgroundSVGs from '../components/BackgroundSVGs'; // Import the new component

function RegisterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' }
  });
  const [serverError, setServerError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError('');
    setRegistrationSuccess(false);
    console.log('Attempting registration for:', data.username);
    const { username, email, password } = data; // Exclude confirmPassword

    try {
      const response = await fetch('http://localhost:5000/api/register', { // Ensure URL is correct
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || `Registration failed with status: ${response.status}`);
      }
      if (responseData.success) {
        console.log('Registration successful:', username);
        setRegistrationSuccess(true);
        setTimeout(() => { navigate('/login'); }, 1500); // Redirect after delay
      } else {
        throw new Error(responseData.message || 'Registration failed: Unexpected response format.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      setServerError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <section
        id="home"
        className="bg-gray-dark relative z-10 overflow-hidden min-h-screen"
      >
        <Container className="registration-container d-flex align-items-center justify-content-center">
          <Card className="registration-card bg-[#1B212D]">
            <Card.Body>
              <h1 className="text-[#4665E4] mb-4">Register</h1>
              {registrationSuccess && (<Alert variant="success"> Registration Successful! Redirecting to login... </Alert>)}
              {serverError && !registrationSuccess && (<Alert variant="danger" onClose={() => setServerError('')} dismissible> {serverError} </Alert>)}

              {!registrationSuccess && (
                <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* Full Name Input */}
                  <Form.Group className="mb-3 text-white" controlId="registerUsername">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      className={`bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm ${errors.username ? 'is-invalid' : ''}`}
                      type="text" placeholder="Enter full name"
                      {...register("username")} isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
                  </Form.Group>
                  {/* Email Input */}
                  <Form.Group className="mb-3 text-white" controlId="registerEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      className={`bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm ${errors.email ? 'is-invalid' : ''}`}
                      type="email" placeholder="Enter email"
                      {...register("email")} isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                  </Form.Group>
                  {/* Password Input */}
                  <Form.Group className="mb-3 text-white" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className={`bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm ${errors.password ? 'is-invalid' : ''}`}
                      type="password" placeholder="Password (min 8 characters)"
                      {...register("password")} isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                  </Form.Group>
                  {/* Confirm Password Input */}
                  <Form.Group className="mb-3 text-white" controlId="registerConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      className={`bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      type="password" placeholder="Confirm Password"
                      {...register("confirmPassword")} isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
                  </Form.Group>
                  {/* Submit Button */}
                  <Button variant="primary" className="bg-[#4665E4] hover:bg-opacity-80 hover:bg-[#4665E4] text-white border-0 w-100" type="submit" disabled={isSubmitting} >
                    {isSubmitting ? (<><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /><span className="ms-2">Registering...</span></>) : ('Register')}
                  </Button>
                </Form>
              )}
              {/* Link to Login Page */}
              <div className="mt-3 text-center">
                <span className="text-gray-400">Already have an account? </span>
                <Button variant="link" className="p-0 text-[#4665E4]" onClick={() => navigate('/login')}>Login here</Button>
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

export default RegisterPage;