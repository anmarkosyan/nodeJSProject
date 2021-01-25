/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

// Create an instance of the Stripe object with your publishable API key
const stripe = Stripe(
  'pk_test_51ICJXBI9C3iXbrPR39Py58N8S7l3pa8DYRO9VlYRKT211BD3eNLiNyQ9Iae499R2R70bhDG81mjW8jMflb4PqYDE00o4nZZ4Cb'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
