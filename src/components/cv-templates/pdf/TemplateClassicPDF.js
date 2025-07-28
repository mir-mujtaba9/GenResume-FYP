// src/components/cv-templates/pdf/TemplateClassicPDF.js
// UPDATED Styles to match TemplateClassic.css more closely
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

// --- Font Registration (Arial) ---
let fontFamily = 'Helvetica'; // Fallback
try {
    Font.register({
        family: 'Arial',
        fonts: [
            { src: '/fonts/arial.ttf' }, { src: '/fonts/arialbd.ttf', fontWeight: 'bold' },
            { src: '/fonts/ariali.ttf', fontStyle: 'italic' }, { src: '/fonts/arialbi.ttf', fontWeight: 'bold', fontStyle: 'italic' },
        ]
    });
    fontFamily = 'Arial';
    console.log("Arial registered for Classic PDF.");
} catch (e) { console.error("Arial PDF font registration failed.", e); }
// ----------------------

// --- Styles matching TemplateClassic.css ---
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column', backgroundColor: '#FFFFFF',
        paddingTop: 36, paddingBottom: 36, paddingHorizontal: 54, // Margins (~0.5in, ~0.75in)
        fontFamily: fontFamily, fontSize: 11, lineHeight: 1.4, color: '#333333',
    },
    header: {
        textAlign: 'center', marginBottom: 28, // ~0.4in
        borderBottomWidth: 0.75, borderBottomColor: '#cccccc', paddingBottom: 7, // ~0.1in
    },
    name: { fontSize: 24, marginBottom: 5, fontWeight: 'bold', color: '#000000' },
    contactInfo: { fontSize: 10, color: '#555555' },
    link: { color: '#555555', textDecoration: 'none' },
    section: { marginBottom: 21 }, // ~0.3in
    sectionTitle: {
        fontSize: 14, color: '#222222', borderBottomWidth: 0.5,
        borderBottomColor: '#eeeeee', paddingBottom: 3, marginBottom: 10, // ~0.15in
        textTransform: 'uppercase', fontWeight: 'bold',
    },
    entry: { marginBottom: 14 }, // ~0.2in
    jobTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 2, color: '#000000' },
    subHeading: { // Holds Company/Institution & Dates
        fontSize: 10, color: '#444444', marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between',
    },
    company: { fontWeight: 'bold', flexShrink: 1 }, // Allow shrinking
    institution: { fontWeight: 'bold' },
    dates: { fontStyle: 'italic', color: '#444444', marginLeft: 10 },
    details: { fontSize: 10.5, lineHeight: 1.35 }, // Use points for PDF sizing
    skillsText: { fontSize: 10.5 },
    additionalEntry: { marginTop: 10, marginBottom: 5 },
    additionalTitle: { fontSize: 11, fontWeight: 'bold', marginBottom: 3, color: '#333333' },
    additionalText: { fontSize: 10 },
    footer: { position: 'absolute', fontSize: 9, bottom: 15, left: 0, right: 0, textAlign: 'center', color: 'grey' },
});

// --- Helper Functions ---
const formatDateRangePDF = (startDate, endDate) => { /* ... (same as before) ... */ };
const createLink = (url) => { /* ... (same as before) ... */ };

// --- PDF Component ---
const TemplateClassicPDF = ({ profile }) => (
    <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.contactInfo}>
                {profile.phone || ''}
                {profile.phone && profile.email ? ' | ' : ''}
                {profile.email ? <Link src={`mailto:${profile.email}`} style={styles.link}>{profile.email}</Link> : ''}
            </Text>
        </View>

        {/* Work Experience */}
        {profile.workExperience?.map((exp, index) => (
            <View key={exp._id || index} style={styles.section} wrap={index === 0}> {/* Wrap only first section maybe */}
                {index === 0 && <Text style={styles.sectionTitle}>Work Experience</Text>}
                <View style={styles.entry} wrap={false}>
                    <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                    <View style={styles.subHeading}>
                        <Text style={styles.company}>{exp.company}</Text>
                        <Text style={styles.dates}>{formatDateRangePDF(exp.startDate, exp.endDate)}</Text>
                    </View>
                    <Text style={styles.details}>{exp.responsibilities}</Text>
                </View>
            </View>
        ))}

        {/* Education */}
        {profile.education?.map((edu, index) => (
            <View key={edu._id || index} style={styles.section} wrap={index === 0}>
                {index === 0 && <Text style={styles.sectionTitle}>Education</Text>}
                <View style={styles.entry} wrap={false}>
                    <Text style={styles.jobTitle}>{edu.degree}</Text> {/* Reuse style */}
                    <View style={styles.subHeading}>
                        <Text style={styles.institution}>{edu.institution}</Text>
                        <Text style={styles.dates}>{edu.graduationYear}</Text>
                    </View>
                </View>
            </View>
        ))}

        {/* Skills */}
        {profile.skills && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <Text style={styles.skillsText}>{profile.skills}</Text>
            </View>
        )}

        {/* Additional Info */}
        {(profile.projects || profile.certifications || profile.languages || profile.achievements) && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Additional Information</Text>
                {profile.projects && (<View style={styles.additionalEntry}><Text style={styles.additionalTitle}>Projects</Text><Text style={styles.additionalText}>{profile.projects}</Text></View>)}
                {/* ... other additional sections ... */}
            </View>
        )}

        {/* Footer */}
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
    </Page>
);

export default TemplateClassicPDF;