// src/components/cv-templates/pdf/TemplateSkillFocusPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

// --- Font Registration ---
// !!! PLACE ACTUAL .ttf FILES (e.g., Lato) IN /public/fonts/ !!!
let sansSerifFont = 'Helvetica'; // Fallback
try {
    Font.register({
        family: 'Lato',
        fonts: [{ src: '/fonts/Lato-Regular.ttf' }, { src: '/fonts/Lato-Bold.ttf', fontWeight: 'bold' }] // Add italic if needed
    });
    sansSerifFont = 'Lato';
    console.log("Lato font registered for SkillFocus PDF.");
} catch (e) { console.error("Failed to register Lato font. Using fallback.", e); }
// ----------------------

// --- Styles ---
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column', backgroundColor: '#FFFFFF',
        padding: '36pt 48pt', // Moderate margins
        fontFamily: sansSerifFont, fontSize: 10.5, lineHeight: 1.35, color: '#333333',
    },
    header: {
        marginBottom: 20, borderBottomWidth: 1.5, borderBottomColor: '#4a90e2', // Accent
        paddingBottom: 10, textAlign: 'left', // Left aligned
    },
    name: { fontSize: 24, fontWeight: 'bold', color: '#2d3748', marginBottom: 3 },
    contactInfo: { fontSize: 9.5, color: '#4a5568', },
    contactSeparator: { color: '#a0aec0' },
    link: { color: '#4a90e2', textDecoration: 'none' }, // Accent link
    section: { marginBottom: 14 },
    sectionTitle: {
        fontSize: 12, color: '#2d3748', marginBottom: 8,
        textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1,
    },
    skillsSection: { // Special section for skills near top
        marginBottom: 16,
        // backgroundColor: '#f7fafc', padding: 10, borderRadius: 3, // Optional background
    },
    skillsTitle: { // Can reuse sectionTitle or make unique
        fontSize: 12, color: '#2d3748', marginBottom: 6, textTransform: 'uppercase',
        fontWeight: 'bold', letterSpacing: 1,
    },
    skillsListContainer: { // Use flexbox for side-by-side skills if desired
        // flexDirection: 'row', flexWrap: 'wrap',
    },
    skillItem: {
        // backgroundColor: '#e2e8f0', color: '#4a5568', // Tag style
        // padding: '3pt 6pt', borderRadius: 3, fontSize: 9.5,
        // marginRight: 5, marginBottom: 5,
        fontSize: 10, // Simple list style
        marginBottom: 3,
    },
    entry: { marginBottom: 12 },
    entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
    entryTitle: { fontSize: 11, fontWeight: 'bold', color: '#2d3748' },
    entryDates: { fontSize: 9, color: '#718096', fontStyle: 'italic' },
    subHeading: { fontSize: 10, fontWeight: 'bold', color: '#4a5568', marginBottom: 3 },
    details: { fontSize: 10, color: '#4a5568' },
    additionalEntry: { marginBottom: 8 },
    additionalTitle: { fontSize: 10.5, fontWeight: 'bold', color: '#4a5568', marginBottom: 2 },
    additionalText: { fontSize: 10, color: '#4a5568' },
    footer: { position: 'absolute', fontSize: 9, bottom: 15, left: 0, right: 0, textAlign: 'center', color: 'grey' },
});

// --- Helper Functions --- (Use same as ClassicPDF)
const formatDateRangePDF = (startDate, endDate) => { /* ... */ };
const createLink = (url) => { /* ... */ };

// --- PDF Component ---
const TemplateSkillFocusPDF = ({ profile }) => (
    <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.contactInfo}>
                {profile.phone || ''}
                {profile.phone && profile.email ? <Text style={styles.contactSeparator}> • </Text> : ''}
                {profile.email ? <Link src={`mailto:${profile.email}`} style={styles.link}>{profile.email}</Link> : ''}
                {/* Add LinkedIn link */}
            </Text>
        </View>

        {/* Skills Section (Prominent) */}
        {profile.skills && (
            <View style={styles.skillsSection}>
                <Text style={styles.skillsTitle}>Key Skills</Text>
                {/* Option 1: Simple Text */}
                <Text style={styles.skillItem}>{profile.skills}</Text>
                {/* Option 2: Split into "tags" (requires parsing logic) */}
                {/* <View style={styles.skillsListContainer}>
                     {profile.skills.split(/,|\n/).map((skill, index) => skill.trim() ? (
                         <Text key={index} style={styles.skillItem}>{skill.trim()}</Text>
                     ) : null)}
                 </View> */}
            </View>
        )}

        {/* Experience */}
        {profile.workExperience && profile.workExperience.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {profile.workExperience.map((exp, index) => (
                    <View key={exp._id || index} style={styles.entry} wrap={false}>
                        <View style={styles.entryHeader}>
                            <Text style={styles.entryTitle}>{exp.jobTitle}</Text>
                            <Text style={styles.entryDates}>{formatDateRangePDF(exp.startDate, exp.endDate)}</Text>
                        </View>
                        <Text style={styles.subHeading}>{exp.company}</Text>
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
                        <View style={styles.entryHeader}>
                            <Text style={styles.entryTitle}>{edu.degree}</Text>
                            <Text style={styles.entryDates}>{edu.graduationYear}</Text>
                        </View>
                        <Text style={styles.subHeading}>{edu.institution}</Text>
                    </View>
                ))}
            </View>
        )}

        {/* Additional Info */}
        {(profile.projects || profile.certifications || profile.languages || profile.achievements) && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Additional</Text>
                {profile.projects && (<View style={styles.additionalEntry}><Text style={styles.additionalTitle}>Projects</Text><Text style={styles.additionalText}>{profile.projects}</Text></View>)}
                {profile.certifications && (<View style={styles.additionalEntry}><Text style={styles.additionalTitle}>Certifications</Text><Text style={styles.additionalText}>{profile.certifications}</Text></View>)}
                {profile.languages && (<View style={styles.additionalEntry}><Text style={styles.additionalTitle}>Languages</Text><Text style={styles.additionalText}>{profile.languages}</Text></View>)}
                {profile.achievements && (<View style={styles.additionalEntry}><Text style={styles.additionalTitle}>Achievements</Text><Text style={styles.additionalText}>{profile.achievements}</Text></View>)}
            </View>
        )}

        {/* Footer */}
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
    </Page>
);

export default TemplateSkillFocusPDF;