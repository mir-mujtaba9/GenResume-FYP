// src/components/WorkExperienceSection.js
import React from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import { Controller } from 'react-hook-form'; // Import Controller
import DatePicker from 'react-datepicker'; // Import DatePicker

import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker
import '../../styling/react-datepicker-custom.css'; // Optional: Your custom overrides

// Props now include 'control' which is needed by Controller
function WorkExperienceSection({ fields, append, remove, register, errors, control }) {

    // Function to get value safely (handles null/undefined for DatePicker)
    const getSafeDateValue = (value) => value ? new Date(value) : null;

    return (
        <div className="form-section mb-4">
            <h3 className="mb-3 text-white">Work Experience</h3>
            {fields.map((item, index) => ( // Renamed 'field' to 'item' to avoid conflict with Controller's 'field'
                <Card key={item.id} className="mb-3 bg-[#2C303B] border-secondary p-3">
                    <Row className="align-items-center mb-2">
                        <Col><h5 className="text-light">Experience #{index + 1}</h5></Col>
                        <Col className="text-end">
                            {fields.length > 1 && (
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    aria-label={`Remove Experience #${index + 1}`}
                                >
                                    Remove
                                </Button>
                            )}
                        </Col>
                    </Row>
                    {/* Job Title and Company remain the same */}
                    <Row>
                        <Col md={6}>
                            <Form.Group className='mb-2' controlId={`formJobTitle${index}`}>
                                <Form.Label className='text-white'>Job Title <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    className="bg-[#1B212D] text-white focus:bg-[#1B212D] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                                    type="text"
                                    placeholder="e.g., Software Engineer"
                                    {...register(`workExperience.${index}.jobTitle`)}
                                    isInvalid={!!errors.workExperience?.[index]?.jobTitle}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.workExperience?.[index]?.jobTitle?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className='mb-2' controlId={`formCompany${index}`}>
                                <Form.Label className='text-white'>Company <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    className="bg-[#1B212D] text-white focus:bg-[#1B212D] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                                    type="text"
                                    placeholder="e.g., Google"
                                    {...register(`workExperience.${index}.company`)}
                                    isInvalid={!!errors.workExperience?.[index]?.company}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.workExperience?.[index]?.company?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* --- Date Pickers --- */}
                    <Row>
                        {/* Start Date */}
                        <Col md={6}>
                            <Form.Group className='mb-2' controlId={`formStartDate${index}`}>
                                <Form.Label className='text-white'>Start Date <span className="text-danger">*</span></Form.Label>
                                <Controller
                                    control={control}
                                    name={`workExperience.${index}.startDate`}
                                    render={({ field }) => (
                                        <DatePicker
                                            selected={getSafeDateValue(field.value)} // Use safe value getter
                                            onChange={(date) => field.onChange(date)}
                                            selectsStart
                                            // endDate={getSafeDateValue(fields[index]?.endDate)} // Can cause issues, rely on validation
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            placeholderText="MM/YYYY"
                                            className="form-control bg-[#1B212D] text-white focus:bg-[#1B212D] placeholder-gray-400 border-0 focus:ring-0 shadow-sm" // Apply Bootstrap class
                                            wrapperClassName="w-100" // Ensure wrapper takes full width
                                            maxDate={new Date()} // Cannot select future date
                                            isInvalid={!!errors.workExperience?.[index]?.startDate}
                                        />
                                    )}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: errors.workExperience?.[index]?.startDate ? 'block' : 'none' }}>
                                    {errors.workExperience?.[index]?.startDate?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {/* End Date */}
                        <Col md={6}>
                            <Form.Group className='mb-2' controlId={`formEndDate${index}`}>
                                <Form.Label className='text-white'>End Date <span className="text-danger">*</span></Form.Label>
                                <Controller
                                    control={control}
                                    name={`workExperience.${index}.endDate`}
                                    render={({ field }) => (
                                        <DatePicker
                                            selected={getSafeDateValue(field.value)} // Use safe value getter
                                            onChange={(date) => field.onChange(date)}
                                            selectsEnd
                                            startDate={getSafeDateValue(item.startDate)} // `item` refers to the current field array item
                                            minDate={getSafeDateValue(item.startDate)} // Prevent selecting end before start
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            placeholderText="MM/YYYY"
                                            className="form-control bg-[#1B212D] text-white focus:bg-[#1B212D] placeholder-gray-400 border-0 focus:ring-0 shadow-sm" // Apply Bootstrap class
                                            wrapperClassName="w-100" // Ensure wrapper takes full width
                                            maxDate={new Date()} // Cannot select future date
                                            isInvalid={!!errors.workExperience?.[index]?.endDate}
                                        />
                                    )}
                                />
                                {/* Display both field-specific and schema-level refinement errors */}
                                <Form.Control.Feedback type="invalid" style={{ display: errors.workExperience?.[index]?.endDate ? 'block' : 'none' }}>
                                    {errors.workExperience?.[index]?.endDate?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Responsibilities remain the same */}
                    <Row>
                        <Col>
                            <Form.Group className='mb-2' controlId={`formResponsibilities${index}`}>
                                <Form.Label className='text-white'>Responsibilities <span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    className="bg-[#1B212D] text-white focus:bg-[#1B212D] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Describe your key responsibilities and achievements"
                                    {...register(`workExperience.${index}.responsibilities`)}
                                    isInvalid={!!errors.workExperience?.[index]?.responsibilities}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.workExperience?.[index]?.responsibilities?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card>
            ))}
            <Button
                variant="outline-primary"
                // Update the append function with new default date structure
                onClick={() => append({ jobTitle: '', company: '', startDate: null, endDate: null, responsibilities: '' })}
                className="mt-2"
            >
                + Add Another Work Experience
            </Button>
            {/* Display array-level error */}
            {errors.workExperience && typeof errors.workExperience === 'object' && !Array.isArray(errors.workExperience) && (
                <div className="text-danger mt-2 small">{errors.workExperience.message}</div>
            )}
        </div>
    );
}

export default WorkExperienceSection;