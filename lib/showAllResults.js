'use strict';

// function JS
const client = require('./client');

// api JS
const getMusicResults = require('./tunedive/tunedive');
const getYelpResults = require('./yelp/yelp');
const getEventsResults = require('./events/getEventsResults');
const getTriviaResults = require('./trivia/getTriviaResults');
const getNewsResults = require('./news/getNewsResults');

// if adding new APIs, insert functions/promises here
function showAllResults(request, response) {
  let sql = 'SELECT * FROM user_info;';
  client.query(sql)
    .then(results => {
      let answers = results.rows[0];

      let promises = [getYelpResults(answers), getEventsResults(answers), getTriviaResults(answers), getNewsResults(answers), getMusicResults(answers)]; // function goes here
      Promise.all(promises)
        .then(result => {
          response.render('pages/result', { restaurantList: result[0], eventsList: result[1], triviaList: result[2], newsList: result[3], musicList: result[4], displayFavs: false, });
        }) // key/value pairs in here
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err));
}

module.exports = showAllResults;
