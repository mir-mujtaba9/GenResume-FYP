// src/components/EducationSection.js
import React from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';

function EducationSection({ fields, append, remove, register, errors }) {
    return (
        <div className="form-section mb-4">
            <h3 className="mb-3 text-white">Education</h3>
            {fields.map((field, index) => (
                <Card key={field.id} className="mb-3 bg-[#2C303B] border-secondary p-3">
                    <Row className="align-items-center mb-2">
                        <Col><h5 className="text-light">Education #{index + 1}</h5></Col>
                        <Col className="text-end">
                            {fields.length > 1 && (
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    aria-label={`Remove Education #${index + 1}`}
                                >
                                    Remove
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group className='mb-2' controlId={`formDegree${index}`}>
                                <Form.Label className='text-white'>Degree <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    className="bg-[#1B212D] text-white focus:bg-[#1B212D] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                                    type="text"
                                    placeholder="e.g., BSc Computer Science"
                                    {...register(`education.${index}.degree`)}
                                    isInvalid={!!errors.education?.[index]?.degree}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.education?.[index]?.degree?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className='mb-2' controlId={`formInstitution${index}`}>
                                <Form.Label className='text-white'>Institution <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    className="bg-[#1B212D] text-white focus:bg-[#1B212D] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                                    type="text"
                                    placeholder="e.g., University of Example"
                                    {...register(`education.${index}.institution`)}
                                    isInvalid={!!errors.education?.[index]?.institution}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.education?.[index]?.institution?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className='mb-2' controlId={`formGraduationYear${index}`}>
                                <Form.Label className='text-white'>Graduation Year <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    className="bg-[#1B212D] text-white focus:bg-[#1B212D] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                                    type="number"
                                    placeholder="e.g., 2021"
                                    {...register(`education.${index}.graduationYear`)}
                                    isInvalid={!!errors.education?.[index]?.graduationYear}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.education?.[index]?.graduationYear?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card>
            ))}
            <Button
                variant="outline-primary"
                onClick={() => append({ degree: '', institution: '', graduationYear: '' })}
                className="mt-2"
            >
                + Add Another Education Entry
            </Button>
            {/* Display array-level error */}
            {errors.education && typeof errors.education === 'object' && !Array.isArray(errors.education) && (
                <div className="text-danger mt-2 small">{errors.education.message}</div>
            )}
        </div>
    );
}

export default EducationSection;