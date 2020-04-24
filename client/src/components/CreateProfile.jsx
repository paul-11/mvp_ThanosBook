import React, { useState } from 'react';
import axios from 'axios';
import { Form, Row, Button, Spinner } from 'react-bootstrap';


export default function CreateProfile() {
    const [validated, setValidated] = useState(false);

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [about, setAbout] = useState('');

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            axios.put(`search/user/notThanos`, {
                first: first,
                last: last,
                email: email,
                phone: phone,
                about: about
            })
            .then(response => {
                    console.log(response)})
            .catch((err) => console.log('nah'))
        }

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* {console.log(first)}
        {console.log(last)}
        {console.log(email)}
        {console.log(phone)}
        {console.log(about)} */}
            <h1>Sign Up</h1>
            <h3>It's quick and painless</h3>
            <Row>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type="first"
                        placeholder="First Name"
                        onChange={e => setFirst(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type="last"
                        placeholder="Last Name"
                        onChange={e => setLast(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Form.Group controlId="emailForm">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Thanos@balance.net" onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="number">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control required type="number" placeholder="Mobile number" onChange={e => setPhone(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="aboutMe">
                <Form.Label>About Me</Form.Label>
                <Form.Control required as="textarea" rows="3" onChange={e => setAbout(e.target.value)}/>
            </Form.Group>
            <Button type="submit" variant="primary">Sign Up</Button>
        </Form>
    )
}