import React, { useState } from 'react';
import axios from 'axios';
import { Form, Row, Button, Spinner } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from 'formik';
import * as yup from 'yup';

export default function CreateProfile() {

    const schema = yup.object({
        first: yup.string().required("first name required"),
        last: yup.string().required("last name required"),
        birthday: yup.string()
            .test('test-name', 'you must be over 18 years old', 
            function(value) {
                if ((2020 - (parseInt(value.substr(value.length - 4)))) > 18){
                    return true
                    } else {
                      return false
                  }
                })
            .required("birthday required"),
        email: yup.string()
            .email("*Must be a valid email address")
            .required("please enter email"),
        phone: yup.number("numbers only!"
        ).required("please enter phone number"),
        about: yup.string().required()
    });

    const handleSubmit = (values) => {
        console.log(values)
        axios.put(`search/user/notThanos`, {
            first: values.first,
            last: values.last,
            birthday: values.birthday,
            email: values.email,
            phone: values.phone,
            about: values.about
        })
            .then(response => {
                console.log(response)
            })
            .catch((err) => console.log(err))
    }

    return (
        <Formik
            validationSchema={schema}
            // onSubmit={handleSubmit}
            initialValues={{ first: "", last: "", birthday: "", email: "", phone: "", about: ""}}
        >
            {({
                // handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors
            }) => (
                    <Form onSubmit={handleSubmit(values)}>
                        <h1>Edit Your Profile</h1>
                        <h3>It's quick and painless</h3>
                        <Row>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="first"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.first}
                                    isValid={touched.first && !errors.first}
                                    isInvalid={errors.first}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.first}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="last"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.last}
                                    isValid={touched.last && !errors.last}
                                    isInvalid={errors.last}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.last}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="birthday">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="birthday"
                                    placeholder="mm/dd/yyyy"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.birthday}
                                    isValid={touched.birthday && !errors.birthday}
                                    isInvalid={errors.birthday}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.birthday}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="emailForm">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Thanos@balance.net"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                isValid={touched.email && !errors.email}
                                isInvalid={errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="number">
                            <Form.Label>Mobile number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Mobile Number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                isValid={touched.phone && !errors.phone}
                                isInvalid={errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="aboutMe">
                            <Form.Label>About Me</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                name="about"
                                placeholder="I enjoy long walks on the beach!"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.about}
                                isValid={touched.about && !errors.about}
                                isInvalid={errors.about}
                            />
                        </Form.Group>
                        <div className="mb-3">
                            <Form.File id="formcheck-api-regular">
                                <Form.File.Label>Upload Picture</Form.File.Label>
                                <Form.File.Input />
                            </Form.File>
                        </div>
                        <Button type="submit" variant="primary">Sign Up</Button>
                    </Form>
                )}
        </Formik>
    );
}