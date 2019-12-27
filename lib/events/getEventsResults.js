'use strict';

const superagent = require('superagent');
const Event = require('./Event');

function getEventsResults(request, response) {
  
  // request.body should contain the user's city and their selection for their interest
  let url = `http://api.eventful.com/json/events/search?location=${request.query.data.city}&app_key=${process.env.EVENTFUL_API_KEY}&keywords=${USER_INTEREST}&date=today`;

  superagent.get(url)
    .then(results => {
      let rawEventsArr = JSON.parse(results.text).events.event;
      let finalEventsArr = rawEventsArr.map(value => new Event(value));
      if (finalEventsArr.length > 10) {
        finalEventsArr = finalEventsArr.slice(0, 10);
      }
      response.render('apipartials/events', { eventsList: finalEventsArr, });
    })
    .catch(error => console.error(error));
}

module.exports = getEventsResults;
