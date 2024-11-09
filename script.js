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
  locations() {
    let lat, lng;
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
        this.renderWeatherInfo(dataWeather);
      })
      .catch(error => console.error(error));
  }
  renderWeatherInfo(dataWeather) {
    const weatherHTML = `
      <div class="background">
        <div class="weather-card">
          <div class="weather-card-content">
            <h1>Weather Info</h1>
            <p id="location">Location: ${dataWeather.name}</p>
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
