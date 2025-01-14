import React, { useState } from "react";
import axios from "axios";
import "animate.css";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const weatherApiKey = "a4c447db95b96214d027f589b389daf7"; // OpenWeatherMap API key

  // Fetch weather data
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setWeatherData(null);
      setError("City not found or API error");
    }
    setCity("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center animate__animated animate__fadeInDown">
        Weather App
      </h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter City Name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchWeather}>
          Get Weather
        </button>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {weatherData && (
        <div className="card animate__animated animate__fadeInUp">
          <div className="card-body text-center">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <h2 className="card-title">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="card-text">
              Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
            </p>
            <p className="card-text">Weather: {weatherData.weather[0].description}</p>
            <p className="card-text">
              Feels Like: {Math.round(weatherData.main.feels_like - 273.15)}°C
            </p>
            <p className="card-text">Pressure: {weatherData.main.pressure} hPa</p>
            <p className="card-text">Humidity: {weatherData.main.humidity}%</p>
            <p className="card-text">Wind Speed: {Math.round(weatherData.wind.speed * 3.6)} km/h</p>
            <p className="card-text">Longitude: {weatherData.coord.lon}</p>
            <p className="card-text">Latitude: {weatherData.coord.lat}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
