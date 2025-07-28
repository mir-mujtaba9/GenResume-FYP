// src/components/cv-templates/pdf/TemplateModernPDF.js
// UPDATED Styles to match TemplateModern.css - layout simplified for PDF
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

// --- Font Registration (Example: Calibri) ---
let fontFamily = 'Helvetica'; // Fallback
try {
    Font.register({
        family: 'Calibri',
        fonts: [{ src: '/fonts/calibri.ttf' }, { src: '/fonts/calibrib.ttf', fontWeight: 'bold' }, /* +italic */]
    });
    fontFamily = 'Calibri';
    console.log("Calibri registered for Modern PDF.");
} catch (e) { console.error("Calibri PDF font registration failed.", e); }
// ----------------------

// --- Styles matching TemplateModern.css ---
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 36, // ~0.5in
        fontFamily: fontFamily, fontSize: 10.5, lineHeight: 1.3, color: '#444444',
    },
    header: {
        marginBottom: 20, paddingBottom: 8,
        borderBottomWidth: 1.5, borderBottomColor: '#1a5f7a', // Accent color border
    },
    name: { fontSize: 22, fontWeight: 'bold', color: '#1a5f7a', marginBottom: 2 }, // Accent color
    contactCompact: { fontSize: 9.5, color: '#333333', marginBottom: 5 },
    link: { color: '#1a5f7a', textDecoration: 'none' }, // Accent link
    section: { marginBottom: 18 }, // ~0.25in
    sectionTitle: {
        fontSize: 13, fontWeight: 'bold', color: '#1a5f7a', // Accent color
        paddingBottom: 2, marginBottom: 8, // ~0.1in
        textTransform: 'uppercase', letterSpacing: 1,
    },
    entry: { marginBottom: 11 }, // ~0.15in
    entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
    jobTitle: { fontSize: 11, fontWeight: 'bold', color: '#333333' },
    entryDates: { fontSize: 9, color: '#666666', fontStyle: 'italic' },
    subHeading: { fontSize: 10, fontWeight: 'bold', color: '#555555', marginBottom: 3 },
    details: { fontSize: 10 },
    // Sections that were in sidebar, now styled inline
    sidebarStyleSection: { marginBottom: 14 }, // ~0.2in
    sidebarStyleTitle: {
        fontSize: 11, fontWeight: 'bold', color: '#1a5f7a', marginBottom: 5,
        textTransform: 'uppercase', letterSpacing: 0.5,
    },
    sidebarStyleText: { fontSize: 10 },
    footer: { position: 'absolute', fontSize: 9, bottom: 15, left: 0, right: 0, textAlign: 'center', color: 'grey' },
});

// --- Helper Functions --- (Same as ClassicPDF)
const formatDateRangePDF = (startDate, endDate) => { /* ... */ };
const createLink = (url) => { /* ... */ };

// --- PDF Component (Single Column Layout) ---
const TemplateModernPDF = ({ profile }) => (
    <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.contactCompact}>
                {profile.phone || ''}
                {profile.phone && profile.email ? ' | ' : ''}
                {profile.email ? <Link src={`mailto:${profile.email}`} style={styles.link}>{profile.email}</Link> : ''}
                {/* Add LinkedIn */}
            </Text>
        </View>

        {/* Experience */}
        {profile.workExperience?.map((exp, index) => (
            <View key={exp._id || index} style={styles.section} wrap={index === 0}>
                {index === 0 && <Text style={styles.sectionTitle}>Work Experience</Text>}
                <View style={styles.entry} wrap={false}>
                    <View style={styles.entryHeader}>
                        <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                        <Text style={styles.entryDates}>{formatDateRangePDF(exp.startDate, exp.endDate)}</Text>
                    </View>
                    <Text style={styles.subHeading}>{exp.company}</Text>
                    <Text style={styles.details}>{exp.responsibilities}</Text>
                </View>
            </View>
        ))}

        {/* Education */}
        {profile.education?.map((edu, index) => (
            <View key={edu._id || index} style={styles.section} wrap={index === 0}>
                {index === 0 && <Text style={styles.sectionTitle}>Education</Text>}
                <View style={styles.entry} wrap={false}>
                    <View style={styles.entryHeader}>
                        <Text style={styles.jobTitle}>{edu.degree}</Text>
                        <Text style={styles.entryDates}>{edu.graduationYear}</Text>
                    </View>
                    <Text style={styles.subHeading}>{edu.institution}</Text>
                </View>
            </View>
        ))}

        {/* Projects */}
        {profile.projects && (<View style={styles.section}><Text style={styles.sectionTitle}>Projects</Text><Text style={styles.details}>{profile.projects}</Text></View>)}
        {/* Achievements */}
        {profile.achievements && (<View style={styles.section}><Text style={styles.sectionTitle}>Achievements</Text><Text style={styles.details}>{profile.achievements}</Text></View>)}

        {/* Skills (Styled like sidebar section) */}
        {profile.skills && (
            <View style={styles.sidebarStyleSection}>
                <Text style={styles.sidebarStyleTitle}>Skills</Text>
                <Text style={styles.sidebarStyleText}>{profile.skills}</Text>
            </View>
        )}
        {/* Languages */}
        {profile.languages && (
            <View style={styles.sidebarStyleSection}>
                <Text style={styles.sidebarStyleTitle}>Languages</Text>
                <Text style={styles.sidebarStyleText}>{profile.languages}</Text>
            </View>
        )}
        {/* Certifications */}
        {profile.certifications && (
            <View style={styles.sidebarStyleSection}>
                <Text style={styles.sidebarStyleTitle}>Certifications</Text>
                <Text style={styles.sidebarStyleText}>{profile.certifications}</Text>
            </View>
        )}

        {/* Footer */}
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
    </Page>
);

export default TemplateModernPDF;