'use strict';

const express = require('express');
const app = express();
require('ejs');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const client = require('./lib/client');

// determine whether DB has any content, which determines the value of flag
let dbHasContent;
let sql = 'SELECT * FROM user_info;';
client.query(sql)
  .then(results => {
    if (results.rowCount) {
      dbHasContent = true;
      // need to declare getLocPutDB function which makes the geocode api call, stores info in db and redirects to results
      app.put('/quiz', getLocPutDB)
    }
    else {
      dbHasContent = false;
      app.post('/quiz', getLocPostDB)
    }
  });

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded());

// api JS
const getYelpResults = require('./lib/yelp/yelp');
const getEventsResults = require('./lib/events/getEventsResults');


// routes
app.get('/', getHome);
app.get('/result', getYelpResults);
app.get('/result', getEventsResults);
app.get('/aboutUs', aboutUs);
app.get('/quiz', displayQuiz);

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
  response.status(404).send('page not found');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
