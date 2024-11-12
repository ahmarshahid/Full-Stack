// src/fetchWeather.js

const API_KEY = '6a5a830d17f84cf196f60711240611';
const BASE_URL = 'https://api.weatherapi.com/v1';

async function fetchWeather(city) {
  try {
    const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

export default fetchWeather;
