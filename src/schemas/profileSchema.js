// src/schemas/profileSchema.js
import * as z from 'zod';

const currentYear = new Date().getFullYear();

// Regex patterns
const nameRegex = /^[A-Za-z\s.'-]+$/;
const phoneRegex = /^\d{11}$/;
const basicTextRegex = /^[A-Za-z0-9\s.,'-]+$/;
const companyTextRegex = /^[A-Za-z0-9\s&.,'-]+$/;

// Work Experience Sub-Schema (Remains Required)
export const workExperienceSchema = z.object({
    jobTitle: z.string().trim().min(1, 'Job title is required.').regex(basicTextRegex, 'Job Title contains invalid characters.'),
    company: z.string().trim().min(1, 'Company name is required.').regex(companyTextRegex, 'Company name contains invalid characters.'),
    startDate: z.date({
        required_error: 'Start date is required.',
        invalid_type_error: 'Please select a valid start date.',
    }),
    endDate: z.date({
        required_error: 'End date is required.',
        invalid_type_error: 'Please select a valid end date.',
    }),
    responsibilities: z.string().trim().min(5, 'Responsibilities must be at least 5 characters.'),
}).refine(data => {
    if (data.startDate && data.endDate) {
        const start = new Date(data.startDate).setHours(0, 0, 0, 0);
        const end = new Date(data.endDate).setHours(0, 0, 0, 0);
        return end >= start;
    }
    return true;
}, {
    message: 'End date cannot be earlier than start date.',
    path: ['endDate'],
});


// Education Sub-Schema (Remains Required)
export const educationSchema = z.object({
    degree: z.string().trim().min(1, 'Degree is required.').regex(basicTextRegex, 'Degree contains invalid characters.'),
    institution: z.string().trim().min(1, 'Institution is required.').regex(companyTextRegex, 'Institution name contains invalid characters.'),
    graduationYear: z.string()
        .trim()
        .min(1, 'Graduation year is required.')
        .regex(/^\d{4}$/, 'Graduation year must be a 4-digit number.')
        .refine(year => {
            const numYear = parseInt(year, 10);
            return numYear >= 1900 && numYear <= currentYear;
        }, `Year must be between 1900 and ${currentYear}.`),
});

// Main Profile Schema (Updated with Optional Fields)
export const profileSchema = z.object({
    // --- Required Fields ---
    name: z.string().trim().min(1, 'Name is required.').regex(nameRegex, 'Name should only contain letters, spaces, periods, hyphens, and apostrophes.'),
    phone: z.string().trim().min(1, 'Phone number is required.').regex(phoneRegex, 'Phone number must be exactly 11 digits.'),
    email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.'),
    workExperience: z.array(workExperienceSchema).min(1, 'At least one work experience entry is required.'),
    education: z.array(educationSchema).min(1, 'At least one education entry is required.'),
    skills: z.string().trim().min(1, 'Skills are required.'),

    // --- Optional Fields ---
    certifications: z.string()
        .trim()
        .optional() // Make optional
        .or(z.literal('')), // Allow empty string

    achievements: z.string()
        .trim()
        .optional() // Make optional
        .or(z.literal('')), // Allow empty string

    languages: z.string()
        .trim()
        .optional() // Make optional
        .or(z.literal('')), // Allow empty string

    projects: z.string()
        .trim()
        .optional() // Make optional
        .or(z.literal('')), // Allow empty string
});

// Default values structure remains compatible
export const defaultProfileValues = {
    name: '',
    phone: '',
    email: '',
    workExperience: [{
        jobTitle: '',
        company: '',
        startDate: null,
        endDate: null,
        responsibilities: ''
    }],
    education: [{ degree: '', institution: '', graduationYear: '' }],
    skills: '',
    certifications: '', // Default empty string is fine for optional
    achievements: '',   // Default empty string is fine for optional
    languages: '',      // Default empty string is fine for optional
    projects: '',       // Default empty string is fine for optional
};