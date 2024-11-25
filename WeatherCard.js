export function WeatherCard(dataWeather, location) {
  return `
      <div class="weather-card">
        <div class="weather-header">
          <h1>Weather Information</h1>
          <span id="location" class="location-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span id="location-text">${location}</span>
          </span>
        </div>
        <div class="weather-details">
          <div class="temperature-section">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
            </svg>
            <div>
              <p id="temperature" class="temperature-value">${Math.round(
                dataWeather.main.temp - 273.15
              )}°C</p>
              <p id="description" class="temperature-description">${
                dataWeather.weather[0].description
              }</p>
            </div>
          </div>
          <div class="additional-details">
            <div class="detail-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z"></path>
              </svg>
              <div>
                <p class="detail-label">Humidity</p>
                <p id="humidity" class="detail-value">${
                  dataWeather.main.humidity
                }%</p>
              </div>
            </div>
            <div class="detail-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <div>
                <p class="detail-label">Wind Speed</p>
                <p id="wind-speed" class="detail-value">${
                  dataWeather.wind.speed
                } m/s</p>
              </div>
            </div>
            <div class="detail-item">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    
                    <path d="M12 2a4 4 0 0 1 4 4v1h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-4v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-1h-4a4 4 0 0 1-4-4 4 4 0 0 1 4-4h4V6a4 4 0 0 1 4-4z"></path>
                </svg>
                <div>
                    <p class="detail-label">Condition</p>
                    <p id="weather-condition" class="detail-value">${
                      dataWeather.weather[0].main
                    }</p>
                </div>
                </div>
            <div class="detail-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
              </svg>
              <div>
                <p class="detail-label">Feels Like</p>
                <p id="feels-like" class="detail-value">${Math.round(
                  dataWeather.main.feels_like - 273.15
                )}°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}
