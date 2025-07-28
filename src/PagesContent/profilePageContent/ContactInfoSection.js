// src/components/ContactInfoSection.js
import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

function ContactInfoSection({ register, errors }) {
    return (
        <div className="form-section mb-4">
            <h3 className='text-white mb-3'>Contact Information</h3>
            <Form.Group className='mb-3' controlId="formName">
                <Form.Label className='text-white'>Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                    className="bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name")}
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Col md={6}>
                    <Form.Group className='mb-3' controlId="formPhone">
                        <Form.Label className="text-white">Phone Number <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            className="bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                            type="tel"
                            placeholder="Enter 11 digit phone number"
                            {...register("phone")}
                            isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className='mb-3' controlId="formEmail">
                        <Form.Label className="text-white">Email Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            className="bg-[#2C303B] text-white focus:bg-[#2C303B] placeholder-gray-400 border-0 focus:ring-0 shadow-sm"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

export default ContactInfoSection;