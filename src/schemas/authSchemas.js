// src/schemas/authSchemas.js
import * as z from 'zod';

// Schema for Login
export const loginSchema = z.object({
    username: z.string().trim().min(1, 'Username is required.'),
    password: z.string().min(1, 'Password is required.'),
});

// Schema for Registration
export const registerSchema = z.object({
    // Using 'username' as the key to match backend, label can still be 'Full Name'
    username: z.string()
        .trim()
        .min(1, 'Full Name is required.')
        .regex(/^[A-Za-z\s]+$/, 'Full Name can only contain letters and spaces.'), // Keep your name validation
    email: z.string().trim().min(1, 'Email is required.').email('Invalid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
}).refine(data => data.password === data.confirmPassword, {
    // Add refinement to check if passwords match
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Set error on confirmPassword field
});