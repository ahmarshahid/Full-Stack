import React, { useState } from 'react';
import fetchWeather from './fetchWeather';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function WeatherApp() {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleGetWeather = () => {
    if (city.trim() === "") {
      setError("Please enter a valid city name.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error message

    // Fetch weather data
    fetchWeather(city)
      .then(data => {
        setWeatherData(data);
        setError(null);
      })
      .catch(() => setError('Could not fetch weather data.'))
      .finally(() => setLoading(false));
  };

  // Function to handle back navigation
  const goBack = () => {
    navigate('/signin'); // Navigate to the SignIn page
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
          textAlign: 'center',
        }}
      >
        <Button
          onClick={goBack}
          variant="secondary"
          style={{
            width: '100%',
            border: 'none',
            backgroundColor: '#4169E1',
            marginBottom: '20px', // Add spacing
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#3551b1'} // Darker blue on hover
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4169E1'} // Revert to original color
        >
          Back
        </Button>

        <h2 className="mb-4">Weather in {city}</h2>
        <Form.Control
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={{
            backgroundColor: '#2c2c2c',
            color: '#ffffff',
            borderColor: '#444',
            marginBottom: '20px',
          }}
        />
        
        <Button
          variant="primary"
          onClick={handleGetWeather}
          className="mb-3"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" variant="light" size="sm" /> : "Get Weather"}
        </Button>

        {error && <Alert variant="danger">{error}</Alert>}

        {weatherData && !loading && (
          <div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              Temperature: {weatherData.current.temp_c} °C
            </p>
            <p style={{ fontSize: '1.2rem' }}>
              Condition: {weatherData.current.condition.text}
            </p>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default WeatherApp;
