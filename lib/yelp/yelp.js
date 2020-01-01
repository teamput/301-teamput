/* eslint-disable camelcase */
'use strict';

const superagent = require('superagent');

let getYelpResults = cityObj => {
  // request.body contains the answer to "Are you hungry?" (yes/no)
  let yesOrNo = cityObj.hunger;
  if (yesOrNo === 'yes') {
    let url = `https://api.yelp.com/v3/businesses/search?term=food&latitude=${cityObj.lat}&longitude=${cityObj.long}&limit=1`;
    return superagent.get(url)
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
      .then(results => {

        let restaurants = results.body.businesses;
        if (restaurants) {
          let restaurantArr = restaurants.map(place => new Restaurant(place));
          return restaurantArr;
        }
        else {
          console.error('error');
        }
      })
      .catch(error => console.error(error));
  }
};

function Restaurant(place) {
  
  if (place.id) {
    this.id = place.id || '(no id available)';
  }
  if (place.name) {
    this.name = place.name || '(no id available)';
  }
  if (place.image_url) {
    this.image_url = place.image_url || '(no image url available)';
  }
  if (place.url) {
    this.url = place.url || '(no url available)';
  }
  if (place.is_closed) {
    this.is_closed = place.is_closed || '(no close time available)';
  }
  if (place.rating) {
    this.rating = place.rating || '(no rating available)';
  }
  if (place.price) {
    this.price = place.price || '(no price available)';
  }
  if (place.phone) {
    this.phone = place.display_phone || '(no phone number available)';
  }
  if (place.distance) {
    this.distance = place.distance || '(no distance available)';
  }
}

module.exports = getYelpResults;
