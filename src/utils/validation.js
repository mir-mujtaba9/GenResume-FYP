// src/utils/validation.js

export const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

// Note: Still specific to 11 digits. Consider internationalization later.
export const validatePhone = (phone) => /^\d{11}$/.test(phone);

// Allows letters, spaces, periods, hyphens, apostrophes
export const validateName = (name) => /^[A-Za-z\s.'-]+$/.test(name);

export const validateYear = (year) => {
    const numYear = parseInt(year, 10);
    const currentYear = new Date().getFullYear();
    // Check if it's 4 digits AND between 1900 and the current year (inclusive)
    return /^\d{4}$/.test(year) && numYear >= 1900 && numYear <= currentYear;
};

// Note: Still specific format. Consider separate date pickers later.
export const validateWorkDate = (date) => /^(0[1-9]|1[0-2])\/\d{4}\s-\s(0[1-9]|1[0-2])\/\d{4}$/.test(date.trim());

// You could add other reusable validation functions here in the future