'use strict';

const superagent = require('superagent');
const Event = require('./Event');

function getEventsResults(userObj) {
  // request.body should contain the user's city and their selection for their interest
  let url = `http://api.eventful.com/json/events/search?location=${userObj.location}&app_key=${process.env.EVENTFUL_API_KEY}&keywords=${userObj.interest}&date=today`;

  return superagent.get(url)
    .then(results => {
      let rawEventsArr = JSON.parse(results.text).events.event;
      let finalEventsArr = rawEventsArr.map(value => new Event(value));
      if (finalEventsArr) {
        if (finalEventsArr.length > 10) {
          finalEventsArr = finalEventsArr.slice(0, 1);
        }
        return finalEventsArr;
      }
      else {
        console.error('error');
      }
    })
    .catch(error => console.error(error));
}

// function Event(eventObj) {
//   if (eventObj.url) {
//     this.url = eventObj.url || '(no url available)';
//   }
//   if (eventObj.title) {
//     this.title = eventObj.title || '(no title available)';
//   }
//   if (eventObj.venue_name) {
//     this.venue_name = eventObj.venue_name || '(no venue name available)';
//   }
//   if (eventObj.city_name) {
//     this.city_name = eventObj.city_name || '(no city name available)';
//   }
//   if (eventObj.start_time) {
//     this.start_time = eventObj.start_time || '(no start time available)';
//   }
//   if (eventObj.description) {
//     this.description = eventObj.description || '(no description available)';
//   }
// }

module.exports = getEventsResults;
