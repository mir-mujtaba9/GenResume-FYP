// src/components/AdditionalInfoSection.js
import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

function AdditionalInfoSection({ register, errors }) {
    return (
        <>
            <Row>
                <Col md={6}>
                    <Form.Group className='mb-3' controlId="formSkills">
                        {/* Skills remains required */}
                        <Form.Label className='text-white'>Skills <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            className="bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                            as="textarea" rows={3}
                            placeholder="Enter skills, comma-separated (e.g., React, Node.js, Project Management)"
                            {...register("skills")}
                            isInvalid={!!errors.skills}
                        />
                        <Form.Control.Feedback type="invalid">{errors.skills?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className='mb-3' controlId="formCertifications">
                        {/* Certifications is now optional - Removed asterisk */}
                        <Form.Label className='text-white'>Certifications</Form.Label>
                        <Form.Control
                            className="bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                            as="textarea" rows={3}
                            placeholder="e.g., AWS Certified Developer, PMP (Optional)" // Added (Optional) to placeholder
                            {...register("certifications")}
                        // No isInvalid needed if only validation was min(1)
                        // isInvalid={!!errors.certifications}
                        />
                        {/* No feedback needed if only validation was min(1) */}
                        {/* <Form.Control.Feedback type="invalid">{errors.certifications?.message}</Form.Control.Feedback> */}
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className='mb-3' controlId="formAchievements">
                        {/* Achievements is now optional - Removed asterisk */}
                        <Form.Label className='text-white'>Achievements/Awards</Form.Label>
                        <Form.Control
                            className="bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                            as="textarea" rows={3}
                            placeholder="e.g., Employee of the Month, Dean's List (Optional)" // Added (Optional) to placeholder
                            {...register("achievements")}
                        // isInvalid={!!errors.achievements}
                        />
                        {/* <Form.Control.Feedback type="invalid">{errors.achievements?.message}</Form.Control.Feedback> */}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className='mb-3' controlId="formLanguages">
                        {/* Languages is now optional - Removed asterisk */}
                        <Form.Label className='text-white'>Languages</Form.Label>
                        <Form.Control
                            className="bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                            as="textarea" rows={3}
                            placeholder="e.g., English (Native), Spanish (Fluent) (Optional)" // Added (Optional) to placeholder
                            {...register("languages")}
                        // isInvalid={!!errors.languages}
                        />
                        {/* <Form.Control.Feedback type="invalid">{errors.languages?.message}</Form.Control.Feedback> */}
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className='mb-4' controlId="formProjects">
                {/* Projects/Portfolio is now optional - Removed asterisk */}
                <Form.Label className='text-white'>Projects/Portfolio</Form.Label>
                <Form.Control
                    className="bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                    as="textarea" rows={3}
                    placeholder="Link to your portfolio or describe key projects (Optional)" // Added (Optional) to placeholder
                    {...register("projects")}
                // isInvalid={!!errors.projects}
                />
                {/* <Form.Control.Feedback type="invalid">{errors.projects?.message}</Form.Control.Feedback> */}
            </Form.Group>
        </>
    );
}

export default AdditionalInfoSection;