// src/components/cv-templates/pdf/TemplateMinimalistPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

// --- Font Registration (Example: Helvetica Neue - check availability/licensing or use Arial/Calibri) ---
// !!! PLACE ACTUAL .ttf FILES IN /public/fonts/ AND ENSURE PATHS ARE CORRECT !!!
// Using Helvetica as default fallback
let fontFamily = 'Helvetica';
try {
    // Example - you might need to find/license Helvetica Neue fonts
    // Or substitute with another clean sans-serif like Calibri or Open Sans
    /*
    Font.register({
      family: 'HelveticaNeue',
      fonts: [
        { src: '/fonts/helveticaneue.ttf' }, // Adjust paths and filenames
        { src: '/fonts/helveticaneuebd.ttf', fontWeight: 'bold' },
        // Add italic etc. if needed
      ]
    });
    fontFamily = 'HelveticaNeue'; // Use if registered successfully
    console.log("HelveticaNeue font registered successfully for PDF.");
    */
    // For now, let's proceed assuming default Helvetica or previously registered Arial/Calibri
    if (Font.getRegisteredFamilies().includes('Arial')) {
        fontFamily = 'Arial'; // Prefer Arial if available
        console.log("Using registered Arial font for Minimalist PDF.");
    } else if (Font.getRegisteredFamilies().includes('Calibri')) {
        fontFamily = 'Calibri'; // Fallback to Calibri if available
        console.log("Using registered Calibri font for Minimalist PDF.");
    } else {
        console.log("Using default Helvetica font for Minimalist PDF.");
    }

} catch (e) {
    console.error("Failed to register custom font for Minimalist PDF. Using Helvetica fallback.", e);
}
// ----------------------


// --- Styles ---
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30, // Tighter padding (approx 0.4in)
        fontFamily: fontFamily, // Use registered or fallback font
        fontSize: 10, // Smaller base font size (10pt)
        lineHeight: 1.25, // Tighter line spacing
        color: '#222222', // Very dark gray
    },
    // --- Header ---
    header: {
        textAlign: 'center',
        marginBottom: 15, // Less space after header
    },
    name: {
        fontSize: 20, // Smaller name
        marginBottom: 2,
        fontWeight: 'bold',
        color: '#000000',
    },
    contactInfo: {
        fontSize: 9, // Smaller contact info
        color: '#444444',
    },
    link: { color: '#444444', textDecoration: 'none' },

    // --- Sections ---
    section: {
        marginBottom: 10, // Less space between sections
    },
    sectionTitle: {
        fontSize: 12, // Smaller section titles
        fontWeight: 'bold',
        color: '#111111',
        borderBottomWidth: 0.5, // Thin border
        borderBottomColor: '#dddddd',
        paddingBottom: 1,
        marginBottom: 6, // Less space after title
        textTransform: 'uppercase',
        letterSpacing: 0.5, // Less letter spacing
    },
    // --- Entries ---
    entry: {
        marginBottom: 8, // Less space between entries
    },
    entryTitle: { // Job Title / Degree + Company/Institution combined
        fontSize: 10.5, // Slightly larger than body, bold
        fontWeight: 'bold',
        marginBottom: 1,
        color: '#000000',
    },
    companySeparator: { // Text like 'at' or ','
        fontWeight: 'normal',
        color: '#555555',
    },
    dates: {
        fontSize: 9, // Small dates
        color: '#555555',
        marginBottom: 2,
        // fontStyle: 'italic',
    },
    details: {
        fontSize: 9.5, // Smaller details text
    },
    // --- Skills ---
    skillsText: {
        fontSize: 9.5, // Match details size
    },
    // --- Additional Info ---
    additionalSectionPara: { // Paragraph for combined additional info
        fontSize: 9.5,
        marginBottom: 3, // Small space between lines
    },
    additionalLabel: {
        fontWeight: 'bold',
    }
});

// --- Helper Functions --- (Use same as Classic)
const formatDateRangePDF = (startDate, endDate) => { /* ... */ };
const createLink = (url) => { /* ... */ };

// --- PDF Component ---
const TemplateMinimalistPDF = ({ profile }) => (
    <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.contactInfo}>
                {profile.phone || ''}
                {profile.phone && profile.email ? ' | ' : ''}
                {profile.email ? <Link src={`mailto:${profile.email}`} style={styles.link}>{profile.email}</Link> : ''}
                {/* Add other links inline */}
            </Text>
        </View>

        {/* Summary (Optional) */}
        {/* {profile.summary && ...} */}

        {/* Work Experience */}
        {profile.workExperience && profile.workExperience.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {profile.workExperience.map((exp, index) => (
                    <View key={exp._id || index} style={styles.entry} wrap={false}>
                        <Text style={styles.entryTitle}>
                            {exp.jobTitle} <Text style={styles.companySeparator}>at</Text> {exp.company}
                        </Text>
                        <Text style={styles.dates}>{formatDateRangePDF(exp.startDate, exp.endDate)}</Text>
                        <Text style={styles.details}>{exp.responsibilities}</Text>
                    </View>
                ))}
            </View>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {profile.education.map((edu, index) => (
                    <View key={edu._id || index} style={styles.entry} wrap={false}>
                        <Text style={styles.entryTitle}>
                            {edu.degree}<Text style={styles.companySeparator}>,</Text> {edu.institution}
                        </Text>
                        <Text style={styles.dates}>{edu.graduationYear}</Text>
                    </View>
                ))}
            </View>
        )}

        {/* Skills */}
        {profile.skills && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <Text style={styles.skillsText}>{profile.skills}</Text>
            </View>
        )}

        {/* Additional Info - Combined */}
        {(profile.projects || profile.certifications || profile.languages || profile.achievements) && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Additional</Text>
                {profile.projects && (<Text style={styles.additionalSectionPara}><Text style={styles.additionalLabel}>Projects:</Text> {profile.projects}</Text>)}
                {profile.certifications && (<Text style={styles.additionalSectionPara}><Text style={styles.additionalLabel}>Certifications:</Text> {profile.certifications}</Text>)}
                {profile.languages && (<Text style={styles.additionalSectionPara}><Text style={styles.additionalLabel}>Languages:</Text> {profile.languages}</Text>)}
                {profile.achievements && (<Text style={styles.additionalSectionPara}><Text style={styles.additionalLabel}>Achievements:</Text> {profile.achievements}</Text>)}
            </View>
        )}

        {/* Page Number */}
        <Text style={{ position: 'absolute', fontSize: 8, bottom: 15, left: 0, right: 0, textAlign: 'center', color: 'grey' }} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />

    </Page>
);

export default TemplateMinimalistPDF;