import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation
import axios from 'axios'; // Import axios directly

const SignUp = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Directly make the POST request using axios
            const response = await axios.post('http://localhost:5000/user/signup', formData); // Replace with your actual backend URL
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error signing up:', error.response?.data || error);
            setMessage('Sign-up failed');
        }
    };

    const handleRedirectToSignIn = () => {
        // Redirect to sign-in page
        navigate('/signin');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 p-0" style={{ backgroundColor: '#121212' }}>
            <Card className="p-4 shadow" style={{ backgroundColor: '#1c1c1c', color: '#ffffff', maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4" style={{ color: 'white' }}>Sign Up</h2>
                {message && <Alert variant="info">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: '#2c2c2c', color: '#ffffff', borderColor: '#444' }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: '#2c2c2c', color: '#ffffff', borderColor: '#444' }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: '#2c2c2c', color: '#ffffff', borderColor: '#444' }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2 w-100">Sign Up</Button>
                </Form>

                {/* Option to go to Sign In page if the user already has an account */}
                <div className="mt-3 text-center">
                    <p>Already have an account? 
                        <Button variant="link" onClick={handleRedirectToSignIn} style={{ color: '#0d6efd' }}>Sign In</Button>
                    </p>
                </div>
            </Card>
        </Container>
    );
};

export default SignUp;
