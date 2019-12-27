'use strict';

const superagent = require('superagent');

let yelp = (request, response, cityObj) => {
  // request.body contains the answer to "Are you hungry?" (yes/no)
  let yesOrNo = request.body.search;
  if (yesOrNo === 'yes') {
    let url = `https://api.yelp.com/v3/businesses/search?term=food&latitude=${cityObj.lat}&longitude=${cityObj.lng}&limit=10`;
    superagent.get(url)
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
      .then(results => {
        let restaurants = results.body.businesses;
        let restaurantArr = restaurants.map(place => new Restaurant(place));
        response.render('apipartials/yelp', { restaurantList: restaurantArr, });
      })
      .catch(error => console.error(error));
  }
};
function Restaurant(place) {
  this.id = place.id;
  this.name = place.name;
  this.image_url = place.image_url;
  this.is_closed = place.is_closed;
  this.rating = place.rating;
  this.price = place.price;
  this.phone = place.phone;
  this.distance = place.distance;
}

module.exports = yelp;

// example object in array of businesses
// {
//   "id": "09FLRYnePKcUwGDDPIOAkg",
//   "alias": "biscuit-bitch-seattle",
//   "name": "Biscuit Bitch",
//   "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/jtI9ef0yHR7bH_WCrvUPuw/o.jpg",
//   "is_closed": false,
//   "url": "https://www.yelp.com/biz/biscuit-bitch-seattle?adjust_creative=llw9buu4g_t3NsOG9_2ZYQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=llw9buu4g_t3NsOG9_2ZYQ",
//   "review_count": 3697,
//   "categories": [
//       {
//           "alias": "breakfast_brunch",
//           "title": "Breakfast & Brunch"
//       },
//       {
//           "alias": "coffee",
//           "title": "Coffee & Tea"
//       },
//       {
//           "alias": "southern",
//           "title": "Southern"
//       }
//   ],
//   "rating": 4.0,
//   "coordinates": {
//       "latitude": 47.61034,
//       "longitude": -122.34167
//   },
//   "transactions": [],
//   "price": "$",
//   "location": {
//       "address1": "1909 1st Ave",
//       "address2": "",
//       "address3": "",
//       "city": "Seattle",
//       "zip_code": "98101",
//       "country": "US",
//       "state": "WA",
//       "display_address": [
//           "1909 1st Ave",
//           "Seattle, WA 98101"
//       ]
//   },
//   "phone": "+12064417999",
//   "display_phone": "(206) 441-7999",
//   "distance": 855.8216100539307
// },