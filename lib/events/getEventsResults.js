'use strict';

const superagent = require('superagent');
const Event = require('./Event');

function getEventsResults(userObj) {
  // request.body should contain the user's city and their selection for their interest
  let url = `http://api.eventful.com/json/events/search?location=${userObj.location}&app_key=${process.env.EVENTFUL_API_KEY}&keywords=${userObj.interest}&date=this+week`;

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

module.exports = getEventsResults;
