// src/components/ResumeDownloader.js
// UPDATED to include Serif and SkillFocus templates
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { PDFDownloadLink, Document } from '@react-pdf/renderer'; // Make sure this is installed

// Import ALL PDF versions of templates
import TemplateClassicPDF from './cv-templates/pdf/TemplateClassicPDF';
import TemplateModernPDF from './cv-templates/pdf/TemplateModernPDF';
import TemplateMinimalistPDF from './cv-templates/pdf/TemplateMinimalistPDF';
import TemplateSerifPDF from './cv-templates/pdf/TemplateSerifPDF';         // Added
import TemplateSkillFocusPDF from './cv-templates/pdf/TemplateSkillFocusPDF'; // Added

function ResumeDownloader({ profile, template }) {

    // UPDATED function to return the correct PDF template component
    const getPdfTemplateComponent = () => {
        switch (template) {
            case 'modern': return <TemplateModernPDF profile={profile} />;
            case 'minimalist': return <TemplateMinimalistPDF profile={profile} />;
            case 'serif': return <TemplateSerifPDF profile={profile} />;         // Added
            case 'skillfocus': return <TemplateSkillFocusPDF profile={profile} />; // Added
            case 'classic': default: return <TemplateClassicPDF profile={profile} />;
        }
    };

    // Document structure (remains the same concept)
    const MyDocument = <Document>{getPdfTemplateComponent()}</Document>;

    // Filename generation (remains the same concept)
    const sanitizedName = profile?.name?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'user';
    const filename = `Resume_${sanitizedName}_${template}.pdf`;

    // Fallback profile if needed for filename generation or button state
    if (!profile) {
        return <Button variant="success" size="lg" disabled>Download PDF</Button>;
    }

    return (
        <PDFDownloadLink
            document={MyDocument}
            fileName={filename}
            style={{ textDecoration: 'none' }} // Remove link underline
        >
            {({ loading, error }) => ( // Added 'error' handling from react-pdf
                <Button variant="success" disabled={loading} size="lg">
                    {loading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" /> Generating...
                        </>
                    ) : (
                        'Download PDF'
                    )}
                    {/* Basic error indicator from react-pdf */}
                    {/* {error && <span style={{ color: 'red', marginLeft: '10px' }}>(Error!)</span>} */}
                </Button>
            )}
        </PDFDownloadLink>
    );
}

export default ResumeDownloader;