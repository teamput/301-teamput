/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
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

let savetoFavorites = (request, response) => {
  console.log(request.params.apiTableName);
  console.log(request.body);
  // via request.params, figure out which table to add request.body to
  let expr = request.params.apiTableName;
  // eslint-disable-next-line default-case
  switch (expr) {
    case 'events':
      // sql query to check if api info does not already exist in table
      let sqlEvents = 'SELECT * FROM events_favs WHERE title=$1;';
      let safeValueEvents = [request.body.title];
      client.query(sqlEvents, safeValueEvents)
        .then(results => {
          console.log(results.rows);
          if (results.rows.length === 0) {
            let sqlEvents2 = 'INSERT INTO events_favs (url, title, venue_name, city_name, start_time, description) VALUES ($1, $2, $3, $4, $5, $6)';
            let { url, title, venue_name, city_name, start_time, description, } = request.body;
            let safeValuesEvents2 = [url, title, venue_name, city_name, start_time, description];
            client.query(sqlEvents2, safeValuesEvents2)
              .catch(error => console.error(error));
          }
          else {
            console.log('Already in table');
            response.json()
            // front end would retrieve button with jquery and change its content
          }
        })
        .catch(error => console.error(error));
      break;

    case 'yelp':
      let sqlYelp = 'SELECT * FROM yelp_favs WHERE id=$1;';
      let safeValueYelp = [request.body.id];
      client.query(sqlYelp, safeValueYelp)
        .then(results => {
          console.log(results.rows);
          if (results.rows.length === 0) {
            let sqlYelp2 = 'INSERT INTO yelp_favs (id, name, image_url, is_closed, rating, price, distance) VALUES ($1, $2, $3, $4, $5, $6, $7);';
            let { id, name, image_url, is_closed, rating, price, distance, } = request.body;
            let safeValues2 = [id, name, image_url, is_closed, rating, price, distance];
            client.query(sqlYelp2, safeValues2)
              .catch(error => console.error(error));
          }
          else {
            console.log('Already in table');
          }
        })
        .catch(error => console.error(error));
      break;

    case 'news':
      let sqlNews = 'SELECT * FROM news_favs WHERE headline=$1;';
      let safeValueNews = [request.body.headline];
      client.query(sqlNews, safeValueNews)
        .then(results => {
          console.log(results.rows);
          if (results.rows.length === 0) {
            let sqlNews2 = 'INSERT INTO news_favs (headline, abstract, web_url, date, byline, image, source) VALUES ($1, $2, $3, $4, $5, $6, $7);';
            let { headline, abstract, web_url, date, byline, image, source, } = request.body;
            let safeValuesNews2 = [headline, abstract, web_url, date, byline, image, source];
            client.query(sqlNews2, safeValuesNews2)
              .catch(error => console.error(error));
          }
          else {
            console.log('Already in table');
          }
        })
        .catch(error => console.error(error));
      break;
    case 'music':
      let sqlMusic = 'SELECT * FROM music_favs WHERE wikilink=$1;';
      let safeValueMusic = [request.body.wikilink];
      client.query(sqlMusic, safeValueMusic)
        .then(results => {
          console.log(results.rows);
          if (results.rows.length === 0) {
            let sqlMusic2 = 'INSERT INTO music_favs (name, teaser, wikilink, youtubeLink) VALUES ($1, $2, $3, $4);';
            let { name, teaser, wikilink, youtubeLink, } = request.body;
            let safeValuesMusic2 = [name, teaser, wikilink, youtubeLink];
            client.query(sqlMusic2, safeValuesMusic2)
              .catch(error => console.error(error));
          }
          else {
            console.log('Already in table');
          }
        })
        .catch(error => console.error(error));
      break;
    default:
      console.log('Please try again. Select a different item to save');
  }
};

// routes
app.get('/', getHome);
app.get('/result', showAllResults);
app.get('/aboutUs', aboutUs);
app.get('/quiz', displayQuiz);
app.put('/quiz', getLocPutdb);
app.delete('/result', deleteDbInfo);
app.delete('/', deleteDbInfo);
app.post('/result/:apiTableName', savetoFavorites);

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
  response.status(404).render('pages/error.ejs');
});
client.connect(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
