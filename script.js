'use strict';

class Data {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  getPosition() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  applyWeatherDesign(weatherCondition) {
    const body = document.body;
    body.className = ''; // Reset any existing weather class
    const weatherClasses = {
      Clear: 'sunny',
      Clouds: 'cloudy',
      Rain: 'rainy',
      Snow: 'snowy',
      Drizzle: 'drizzly',
      Thunderstorm: 'stormy',
    };

    const weatherClass = weatherClasses[weatherCondition] || 'default-weather';
    body.classList.add(weatherClass);
  }
  async locations() {
    try {
      let lat, lng, location;
      const pos = await this.getPosition();
      console.log(pos);
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
      console.log(lat, lng);

      const res = await fetch(
        `https://api.tomtom.com/maps/orbis/places/reverseGeocode/${lat},${lng}.json?key=4lgnZb9buoDcdkr73Zm2niPb5kzo1PoM&radius=100&apiVersion=1`
      );
      if (!res.ok)
        throw new Error(`problem in getting the location ${res.status}`);
      console.log(res);

      const data = await res.json();
      console.log(data.addresses[0]);
      location = data.addresses[0].address.municipality;
      console.log(location);

      const resWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=cea179dffc48165803610302c1237ef4`
      );
      if (!resWeather.ok)
        throw new Error(
          `problem in getting the weather data ${resWeather.status}`
        );
      console.log(resWeather);

      const dataWeather = await resWeather.json();
      console.log(dataWeather);
      this.applyWeatherDesign(dataWeather.weather[0].main);
      this.renderWeatherInfo(dataWeather, location);
    } catch (error) {
      console.error(error);
    }
  }

  renderWeatherInfo(dataWeather, location) {
    const weatherHTML = `
      <div class="weather-container">
      <div class="weather-background">
        <div class="weather-card">
          <div class="weather-header">
            <h1>Weather Information</h1>
            <span id="location" class="location-badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span id="location-text">${location}</span>
            </span>
          </div>

          <div class="weather-details">
            <div class="temperature-section">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
              </svg>
              <div>
                <p id="temperature" class="temperature-value">${Math.round(
                  dataWeather.main.temp - 273.15
                )}°C</p>
                <p id="description" class="temperature-description">
                  
                </p>
              </div>
            </div>

            <div class="additional-details">
              <div class="detail-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z"
                  ></path>
                </svg>
                <div>
                  <p class="detail-label">Humidity</p>
                  <p id="humidity" class="detail-value">${
                    dataWeather.main.humidity
                  }%</p>
                </div>
              </div>

              <div class="detail-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <div>
                  <p class="detail-label">Wind Speed</p>
                  <p id="wind-speed" class="detail-value">${
                    dataWeather.wind.speed
                  } m/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    `;

    const page = document.querySelector('.weather-container');
    page.insertAdjacentHTML('beforeend', weatherHTML);
  }
}

const data = new Data();
data.locations();

/*       this is the previous version of the code using fetch and promise  in the top we refactored it in a better way by using 
            async and await  , how ever i still put the promise version here
class Data {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  getPosition() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  locations() {
    let lat, lng, location;
    this.getPosition()
      .then(pos => {
        console.log(pos);
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        console.log(lat, lng);
        return fetch(
          `https://api.tomtom.com/maps/orbis/places/reverseGeocode/${lat},${lng}.json?key=4lgnZb9buoDcdkr73Zm2niPb5kzo1PoM&radius=100&apiVersion=1`
        );
      })
      .then(res => {
        if (!res.ok)
          throw new Error(`problem in getting the location ${res.status}`);
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data.addresses[0]);
        location = data.addresses[0].address.municipality;
        console.log(location);

        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=cea179dffc48165803610302c1237ef4`
        );
      })
      .then(resWeather => {
        if (!resWeather.ok)
          throw new Error(
            `problem in getting the weather data ${resWeather.status}`
          );
        console.log(resWeather);
        return resWeather.json();
      })
      .then(dataWeather => {
        console.log(dataWeather);
        this.renderWeatherInfo(dataWeather, location);
      })
      .catch(error => console.error(error));
  }
  renderWeatherInfo(dataWeather, location) {
    const weatherHTML = `
      <div class="background">
        <div class="weather-card">
          <div class="weather-card-content">
            <h1>Weather Info</h1>
            <p id="location">Location: ${location}</p>
            <p id="temperature">Temperature: ${Math.round(
              dataWeather.main.temp - 273.15
            )}°C</p> <!-- Convert from Kelvin to Celsius -->
            <p id="description">Description: ${
              dataWeather.weather[0].description
            }</p>
            <p id="humidity">Humidity: ${dataWeather.main.humidity}%</p>
            <p id="wind-speed">Wind Speed: ${dataWeather.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    `;

    const page = document.querySelector('.page');
    page.insertAdjacentHTML('beforeend', weatherHTML);
  }
}

const data = new Data();
data.locations();
*/
