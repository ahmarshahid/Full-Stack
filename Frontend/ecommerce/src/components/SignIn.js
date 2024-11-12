import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card, Toast } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Directly import axios
import { useHistory } from 'react-router-dom'; // for navigation

const SignIn = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showWelcome, setShowWelcome] = useState(false); // State to control showing the welcome message
    const [userName, setUserName] = useState(''); // State for user name
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/signin', { email, password });

            if (response.status === 200) {
                const userData = response.data;  
                setUser(userData);  // Set the user state

                localStorage.setItem('user', JSON.stringify(userData));

                setUserName(userData.name); 
                setShowWelcome(true);

                navigate('/products');

                setTimeout(() => {
                    setShowWelcome(false);
                }, 1000);
            }
        } catch (err) {
            setError('Invalid username or password. If you do not have an account, please sign up.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#121212' }}>
            <Card className="p-4 shadow" style={{ backgroundColor: '#1c1c1c', color: '#ffffff', maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4" style={{ color: 'white' }}>Sign In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSignIn}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ backgroundColor: '#2c2c2c', color: '#ffffff', borderColor: '#444' }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ backgroundColor: '#2c2c2c', color: '#ffffff', borderColor: '#444' }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Sign In
                    </Button>
                </Form>
                <div className="mt-3 text-center">
                    <p>Don't have an account? <Link to="/signup" style={{ color: '#0d6efd' }}>Sign up here</Link></p>
                </div>
                {/* Add buttons for Counter and WeatherApp */}
                <div className="mt-4 text-center">
                    <Button onClick={() => navigate('/counter')} className="me-2">Go to Counter</Button>
                    <Button onClick={() => navigate('/weather')} className="me-2">Go to Weather App</Button>
                </div>
            </Card>

            {/* Show Welcome Toast after successful sign-in */}
            {showWelcome && (
                <Toast style={{ position: 'fixed', top: '20px', right: '20px' }} onClose={() => setShowWelcome(false)} delay={1000} autohide>
                    <Toast.Body>Welcome, {userName}!</Toast.Body>
                </Toast>
            )}
        </Container>
    );
};

export default SignIn;
