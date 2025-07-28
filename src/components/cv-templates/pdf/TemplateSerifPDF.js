// src/components/cv-templates/pdf/TemplateSerifPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

// --- Font Registration ---
// !!! PLACE ACTUAL .ttf FILES (e.g., Georgia, Lato) IN /public/fonts/ !!!
let serifFont = 'Times-Roman'; // PDF standard fallback
let sansSerifFont = 'Helvetica'; // PDF standard fallback
try {
    // Example using Georgia & Lato - GET THE FONT FILES!
    Font.register({
        family: 'Georgia',
        fonts: [{ src: '/fonts/georgia.ttf' }, { src: '/fonts/georgiab.ttf', fontWeight: 'bold' }] // Add italic if needed
    });
    Font.register({
        family: 'Lato',
        fonts: [{ src: '/fonts/Lato-Regular.ttf' }, { src: '/fonts/Lato-Bold.ttf', fontWeight: 'bold' }] // Add italic if needed
    });
    serifFont = 'Georgia';
    sansSerifFont = 'Lato';
    console.log("Serif fonts (Georgia, Lato) registered for PDF.");
} catch (e) { console.error("Failed to register Serif/Lato fonts. Using fallback.", e); }
// ----------------------

// --- Styles ---
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column', backgroundColor: '#FFFFFF',
        padding: '36pt 54pt', // Margins (0.5in, 0.75in)
        fontFamily: sansSerifFont, // Default to sans-serif body
        fontSize: 10.5, // 10.5pt body
        lineHeight: 1.4, color: '#1f1f1f',
    },
    header: { textAlign: 'center', marginBottom: 25 },
    name: { fontFamily: serifFont, fontSize: 26, marginBottom: 5, fontWeight: 'normal', letterSpacing: 1, color: '#000000' },
    contactInfo: { fontFamily: sansSerifFont, fontSize: 9.5, color: '#444444', marginBottom: 15 },
    contactSeparator: { color: '#999999' },
    link: { color: '#444444', textDecoration: 'none' },
    section: { marginBottom: 15 },
    sectionTitle: {
        fontFamily: serifFont, fontSize: 13, color: '#222222',
        borderBottomWidth: 0.75, borderBottomColor: '#aaaaaa',
        paddingBottom: 3, marginBottom: 10, textTransform: 'uppercase',
        fontWeight: 'bold', letterSpacing: 1.5,
    },
    entry: { marginBottom: 12, },
    entryTitle: { // Job Title / Degree
        fontFamily: serifFont, fontSize: 11, fontWeight: 'bold',
        marginBottom: 1, color: '#111111',
    },
    entrySubheading: { // Container for company/dates
        flexDirection: 'row', justifyContent: 'space-between',
        marginBottom: 4, fontFamily: sansSerifFont, fontSize: 9.5,
    },
    company: { fontWeight: 'bold', color: '#333333', flexShrink: 1 }, // Allow company to shrink if needed
    institution: { fontWeight: 'bold', color: '#333333' },
    dates: { color: '#555555', textAlign: 'right', marginLeft: 10 }, // Align dates right
    details: { fontSize: 10.5, color: '#333333', textAlign: 'justify' }, // Justified text
    skillsText: { fontSize: 10.5 },
    footer: { position: 'absolute', fontSize: 9, bottom: 15, left: 0, right: 0, textAlign: 'center', color: 'grey' },
});

// --- Helper Functions --- (Use same as ClassicPDF)
const formatDateRangePDF = (startDate, endDate) => { /* ... using month: 'long' ... */ };
const createLink = (url) => { /* ... */ };

// --- PDF Component ---
const TemplateSerifPDF = ({ profile }) => (
    <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.contactInfo}>
                {profile.phone || ''}
                {profile.phone && profile.email ? <Text style={styles.contactSeparator}> | </Text> : ''}
                {profile.email ? <Link src={`mailto:${profile.email}`} style={styles.link}>{profile.email}</Link> : ''}
                {/* Add LinkedIn */}
            </Text>
        </View>

        {/* Experience */}
        {profile.workExperience && profile.workExperience.length > 0 && (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {profile.workExperience.map((exp, index) => (
                    <View key={exp._id || index} style={styles.entry} wrap={false}>
                        <Text style={styles.entryTitle}>{exp.jobTitle}</Text>
                        <View style={styles.entrySubheading}>
                            <Text style={styles.company}>{exp.company}</Text>
                            <Text style={styles.dates}>{formatDateRangePDF(exp.startDate, exp.endDate)}</Text>
                        </View>
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
                        <Text style={styles.entryTitle}>{edu.degree}</Text>
                        <View style={styles.entrySubheading}>
                            <Text style={styles.institution}>{edu.institution}</Text>
                            <Text style={styles.dates}>{edu.graduationYear}</Text>
                        </View>
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

        {/* Add other sections (Projects, Certs, Langs, Achievs) similarly */}


        {/* Footer */}
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
    </Page>
);

export default TemplateSerifPDF;