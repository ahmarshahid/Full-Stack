import React, { useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Counter = () => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate(); // Hook to navigate to another route

    const increment = () => setCount(count + 1);
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const goBack = () => {
        navigate('/signin');  // Navigate to the SignIn page
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#121212' }}
        >
            <Card
                className="p-4 shadow-lg"
                style={{
                    backgroundColor: '#1c1c1c',
                    color: '#ffffff',
                    maxWidth: '400px',
                    width: '100%',
                    borderRadius: '10px',
                    textAlign: 'center'
                }}
            >
                <Button
                    onClick={goBack}
                    className="mb-3"
                    variant="secondary"
                    style={{
                        width: '100%',
                        border: 'none',
                        backgroundColor: '#4169E1',
                        transition: 'all 0.3s ease', // Smooth transition
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#3551b1'}  // Darker royal blue on hover
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#4169E1'}  // Revert to original color when mouse leaves
                >
                    Back
                </Button>

                <h2 className="mb-4" style={{ fontSize: '2rem' }}>Counter</h2>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Count: {count}</p>
                <div className="d-flex justify-content-center">
                    <Button
                        onClick={increment}
                        className="btn-lg me-2"
                        style={{ backgroundColor: '#007bff', border: 'none' }}
                    >
                        Increment
                    </Button>
                    <Button
                        onClick={decrement}
                        className="btn-lg"
                        style={{ backgroundColor: '#dc3545', border: 'none' }}
                        disabled={count === 0}  // Disable button when count is 0
                    >
                        Decrement
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default Counter;
