'use strict';

// server set up
const express = require('express');
const app = express();
require('ejs');
require('dotenv').config();
const methodOverride = require('method-override');
const superagent = require('superagent');
app.use(methodOverride('_method'));
const PORT = process.env.PORT || 3001;
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded());

// function JS
const client = require('./lib/client');
const getLocPutdb = require('./lib/getlocputdb');

// api JS
const getMusicResults = require('./lib/tunedive/tunedive');
const getYelpResults = require('./lib/yelp/yelp');
const getEventsResults = require('./lib/events/getEventsResults');
const getTriviaResults = require('./lib/trivia/getTriviaResults');
const getNewsResults = require('./lib/news/getNewsResults');

// routes
app.get('/', getHome);
app.get('/result', showAllResults);
app.get('/aboutUs', aboutUs);
app.get('/quiz', displayQuiz);
app.put('/quiz', getLocPutdb);
app.delete('/result', deleteDbInfo);
app.delete('/', deleteDbInfo);

function deleteDbInfo(request, response) {
  let sql = 'DELETE FROM user_info;';
  client.query(sql);
  response.redirect('/');
}

// if adding new APIs, insert functions/promises here
function showAllResults(request, response) {
  let sql = 'SELECT * FROM user_info;';
  client.query(sql)
    .then(results => {
      let answers = results.rows[0];

      let promises = [getYelpResults(answers), getEventsResults(answers), getTriviaResults(answers), getNewsResults(answers), getMusicResults(answers)]; // function goes here
      Promise.all(promises)
        .then(result => {
          response.render('pages/result', { restaurantList: result[0], eventsList: result[1], triviaList: result[2], newsList: result[3], musicArray: result[4], });
        }) // key/value pairs in here
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err));
}

function getHome(request, response) {
  response.render('pages/index');
}

function aboutUs(request, response) {
  response.render('pages/aboutUs');
}

function displayQuiz(request, response) {
  response.render('pages/quiz');
}

app.use('*', (request, response) => {
  response.status(404).send('pages/error.ejs');
});
client.connect(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
