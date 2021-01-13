/* eslint-disable */
//console.log('hello from the parcel!');

import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login } from './login';

//📌DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');

//📌Delegations
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

//create event listener for the submit event on our login form
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
