import { useState } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const getWeatherData = (e) => {
    if (e.key === "Enter") {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fc2b37c52989f516e668f41ad852ac0a&units=metric`;

      axios.get(weatherURL)
        .then(response => {
          setData(response.data);
        })
        .catch(error => console.error("Error fetching weather:", error));

      setLocation(""); // Clears input field
    }
  };

  return (
    <div className="app">
      <div className="page-title">
        <h1 className="me-weather">Me-Weather</h1>
      </div>

      <div className="weather">
        <div className="inputbox">
          <input 
            required 
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyPress={getWeatherData}
          />
          <span>Enter Location</span>
          <i></i>
        </div>

        <div className="top">
          <div className="main-details">
            <div className="location">
              <p>{data?.name || ""}</p>
            </div>

            <div className="description">
              <p>
                {data?.weather?.[0]?.description
                  ? data.weather[0].description
                      .split(" ") // Split into words
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
                      .join(" ") // Join back into a sentence
                  : 
                  ""}
              </p>
            </div>
          </div>

          <div className="temp">
            <h1 className="change-font-size-temp">{data?.main?.temp ? `${data.main.temp.toFixed(1)}°C` : "-°C"}</h1>
          </div>
        </div>

        <div className="bottom">
          <div className="bottom-top">
            <div className="feels-like">
              <p className="change-font-size">
                {data?.main?.feels_like ? `${data.main.feels_like.toFixed(1)}°C` : "-°C"}
              </p>
              <p className="change-font-size">Feels Like</p>
            </div>

            <div className="humidity">
              <p className="change-font-size">
                {data?.main?.humidity ? `${data.main.humidity.toFixed(1)}%` : "-%"}
              </p>
              <p className="change-font-size">Humidity</p>
            </div>

            <div className="wind-speed">
              <p className="change-font-size">
                {data?.wind?.speed ? `${data.wind.speed.toFixed(1)} MPS` : "- MPS"}
              </p>
              <p className="change-font-size">Wind Speed</p>
            </div>
          </div>

          <div className="bottom-bottom">
            <div className="pressure">
              <p className="change-font-size">{data?.main?.pressure ? `${data?.main?.pressure} hPa` : "-hPa"} </p>
              <p className="change-font-size">Pressure</p>
            </div>

            <div className="visibility">
              <p className="change-font-size">{data?.visibility ? `${(data?.visibility / 1000).toFixed(1)} KM` : "-KM"}</p>
              <p className="change-font-size">Visibility</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
