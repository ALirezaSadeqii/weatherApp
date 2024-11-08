'use strict';
// my api key 4lgnZb9buoDcdkr73Zm2niPb5kzo1PoM
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const locations = function () {
  getPosition()
    .then(pos => {
      console.log(pos);
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(lat, lng);
      return fetch(
        `https://api.tomtom.com/maps/orbis/places/reverseGeocode/${lat},${lng}.json?key=4lgnZb9buoDcdkr73Zm2niPb5kzo1PoM&radius=100&apiVersion=1`
      );
    })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data.addresses[0].address.municipality);
    });
};

locations();
