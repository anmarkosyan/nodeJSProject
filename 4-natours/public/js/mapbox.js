/* eslint-disable */
//console.log('hello from the client-side 😀');

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW51c2htYXJrIiwiYSI6ImNranNnYXVqOTI0bWYyeXRmZWxuMTZmcW4ifQ.b2TPwuEqCaha-op4NNC0vA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
