'use strict';
import { WeatherCard } from './WeatherCard.js';

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
    body.className = '';
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
    const page = document.querySelector('.weather-container');
    page.insertAdjacentHTML('beforeend', WeatherCard(dataWeather, location));
  }
}

class cityData {
  constructor(city) {
    this.city = city;
  }
  applyWeatherDesign(weatherCondition) {
    const body = document.body;
    body.className = '';
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

  async location() {
    try {
      let location;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=cea179dffc48165803610302c1237ef4`
      );
      if (!res.ok)
        throw new Error(`problem in getting the location ${res.status}`);
      console.log(res);
      const data = await res.json();
      console.log(data);
      console.log(data.name);
      location = data.name;
      this.applyWeatherDesign(data.weather[0].main);
      this.renderWeatherInfo(data, location);
    } catch (error) {
      console.error(error);
    }
  }
  renderWeatherInfo(dataWeather, location) {
    const page = document.querySelector('.weather-container');
    page.insertAdjacentHTML('beforeend', WeatherCard(dataWeather, location));
  }
}
const input = document.getElementById('CityInput');
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const CityInput = document.getElementById('CityInput').value;
    if (CityInput.trim() !== '') {
      const page = document.querySelector('.weather-container');
      page.innerHTML = '';
      const data1 = new cityData(CityInput);
      data1.location();
    }
  }
});
const data = new Data();
data.locations();
