import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileDisplay from '../ProfileDisplay'; // Adjust path if your ProfileDisplay.js is elsewhere

// --- UPDATED MOCK for react-bootstrap ---
jest.mock('react-bootstrap', () => {
    const ActualReactBootstrap = jest.requireActual('react-bootstrap');

    const MockCard = ({ children, ...props }) => <div data-testid="mock-card" {...props}>{children}</div>;

    MockCard.Body = ({ children, ...props }) => (
        <div data-testid="mock-card-body" {...props}>{children}</div>
    );
    MockCard.Title = ({ children, as: Component = 'div', ...props }) => (
        <Component data-testid="mock-card-title" {...props}>{children}</Component>
    );
    MockCard.Subtitle = ({ children, as: Component = 'div', ...props }) => (
        <Component data-testid="mock-card-subtitle" {...props}>{children}</Component>
    );
    MockCard.Text = ({ children, as: Component = 'div', ...props }) => (
        <Component data-testid="mock-card-text" {...props}>{children}</Component>
    );

    return {
        ...ActualReactBootstrap,
        Card: MockCard,
    };
});
// --- END OF UPDATED MOCK ---

describe('ProfileDisplay Component', () => {
    const mockProfile = {
        name: 'Sarmad Shakeel',
        email: 'sarmad.shakeel@example.com',
        phone: '123-456-7890',
        skills: 'React, Node.js, JavaScript',
        workExperience: [
            {
                _id: 'work1',
                jobTitle: 'Software Engineer',
                company: 'Tech Solutions Inc.',
                startDate: '2020-01-15T00:00:00.000Z',
                endDate: '2022-12-31T00:00:00.000Z',
                responsibilities: 'Developed web applications.',
            },
        ],
        education: [
            {
                _id: 'edu1',
                degree: 'B.S. Computer Science',
                institution: 'University of Example',
                graduationYear: '2019',
            },
        ],
        certifications: 'AWS Certified Developer',
        achievements: 'Employee of the Month',
        languages: 'English, Urdu',
        projects: 'https://github.com/sarmadshakeel/GenResume',
    };

    test('renders "No profile data available." when profile is null', () => {
        render(<ProfileDisplay profile={null} />);
        expect(screen.getByText('No profile data available.')).toBeInTheDocument();
    });

    test('renders "No profile data available." when profile is undefined', () => {
        render(<ProfileDisplay profile={undefined} />);
        expect(screen.getByText('No profile data available.')).toBeInTheDocument();
    });

    describe('when profile data is provided', () => {
        beforeEach(() => {
            render(<ProfileDisplay profile={mockProfile} />);
        });

        test('renders user name and email', () => {
            expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
            expect(screen.getByText(mockProfile.email)).toBeInTheDocument();
        });

        test('renders contact information', () => {
            expect(screen.getByText('Contact')).toBeInTheDocument();
            expect(screen.getByText((content, element) => {
                return element.tagName.toLowerCase() === 'strong' && content === 'Phone:';
            })).toBeInTheDocument();
            expect(screen.getByText(mockProfile.phone)).toBeInTheDocument();
        });

        test('renders skills', () => {
            expect(screen.getByText('Skills')).toBeInTheDocument();
            expect(screen.getByText(mockProfile.skills)).toBeInTheDocument();
        });

        test('renders work experience with formatted dates', () => {
            expect(screen.getByText('Work Experience')).toBeInTheDocument();
            expect(screen.getByText(mockProfile.workExperience[0].jobTitle)).toBeInTheDocument();
            expect(screen.getByText(mockProfile.workExperience[0].company)).toBeInTheDocument();
            // formatDate for '2020-01-15T00:00:00.000Z' -> "Jan 2020"
            // formatDate for '2022-12-31T00:00:00.000Z' -> "Dec 2022"
            expect(screen.getByText('Jan 2020 - Dec 2022')).toBeInTheDocument();
            expect(screen.getByText(mockProfile.workExperience[0].responsibilities)).toBeInTheDocument();
        });

        test('renders education', () => {
            expect(screen.getByText('Education')).toBeInTheDocument();
            expect(screen.getByText(mockProfile.education[0].degree)).toBeInTheDocument();
            expect(screen.getByText(mockProfile.education[0].institution)).toBeInTheDocument();
            expect(screen.getByText(`Graduation Year: ${mockProfile.education[0].graduationYear}`)).toBeInTheDocument();
        });

        test('renders additional info if present', () => {
            expect(screen.getByText('Additional Info')).toBeInTheDocument();
            expect(screen.getByText('Certifications')).toBeInTheDocument();
            expect(screen.getByText(mockProfile.certifications)).toBeInTheDocument();
            expect(screen.getByText('Achievements/Awards')).toBeInTheDocument();
            expect(screen.getByText(mockProfile.achievements)).toBeInTheDocument();
            expect(screen.getByText('Languages')).toBeInTheDocument();
            expect(screen.getByText(mockProfile.languages)).toBeInTheDocument();
            expect(screen.getByText('Projects/Portfolio')).toBeInTheDocument();
            const projectLink = screen.getByText(mockProfile.projects);
            expect(projectLink).toBeInTheDocument();
            expect(projectLink.closest('a')).toHaveAttribute('href', mockProfile.projects);
        });
    });

    test('renders N/A for missing phone', () => {
        const profileWithoutPhone = { ...mockProfile, phone: '' };
        render(<ProfileDisplay profile={profileWithoutPhone} />);
        // Check for the combined text within the paragraph that contains "Phone:"
        // This regex looks for "Phone:" followed by optional whitespace and then "N/A"
        expect(screen.getByText((content, node) => {
            const hasText = (node) => node.textContent === "Phone: N/A" || node.textContent === "Phone:N/A";
            const nodeHasText = hasText(node);
            const childrenDontHaveText = Array.from(node.children).every(
                (child) => !hasText(child)
            );
            return nodeHasText && childrenDontHaveText;
        })).toBeInTheDocument();
    });

    test('renders N/A for missing skills', () => {
        const profileWithoutSkills = { ...mockProfile, skills: '' };
        render(<ProfileDisplay profile={profileWithoutSkills} />);
        const skillsSectionContainer = screen.getByText('Skills').closest('div.mb-6');
        // Assuming the N/A paragraph is directly within the div after the h3
        const nAPlaceholder = Array.from(skillsSectionContainer.querySelectorAll('p')).find(p => p.textContent.trim() === 'N/A');
        expect(nAPlaceholder).toBeInTheDocument();
    });

    test('renders "Additional Info" with "No additional information provided." message when specific additional fields are empty but core profile exists', () => {
        const profileWithoutSpecificAdditionalInfo = {
            ...mockProfile, // This ensures workExperience, education, skills are present
            certifications: '',
            achievements: '',
            languages: '',
            projects: '',
        };
        render(<ProfileDisplay profile={profileWithoutSpecificAdditionalInfo} />);
        expect(screen.getByText('Additional Info')).toBeInTheDocument();
        expect(screen.getByText('No additional information provided.')).toBeInTheDocument();
    });
});