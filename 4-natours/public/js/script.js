/* eslint-disable */
//console.log('hello from the parcel!');

import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';


//📌DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logOutBtn = document.querySelector('.nav__el--logout')

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

//crate event Listener for submit event when click on log out btn
if(logOutBtn) logOutBtn.addEventListener('click', logout)


