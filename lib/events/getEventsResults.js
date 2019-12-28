'use strict';

const superagent = require('superagent');
const Event = require('./Event');

function getEventsResults(request, response, userObj) {
  
  // request.body should contain the user's city and their selection for their interest
  let url = `http://api.eventful.com/json/events/search?location=${userObj.location}&app_key=${process.env.EVENTFUL_API_KEY}&keywords=${userObj.interest}&date=today`;

  superagent.get(url)
    .then(results => {
      let rawEventsArr = JSON.parse(results.text).events.event;
      let finalEventsArr = rawEventsArr.map(value => new Event(value));
      if (finalEventsArr.length > 10) {
        finalEventsArr = finalEventsArr.slice(0, 10);
      }
      // console.log(finalEventsArr);
      response.render('pages/result', { eventsList: finalEventsArr, });
    })
    .catch(error => console.error(error));
}

module.exports = getEventsResults;
