'use strict';

const express = require('express');
const app = express();
require('ejs');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.static('/public'));
app.use(express.urlencoded());

// api JS
const getYelpResults = require('./lib/yelp/yelp');
const getEventsResults = require('./lib/events/getEventsResults');


// routes
app.get('/', getHome);
app.post('/result', getYelpResults);
app.get('/result', getEventsResults);
app.get('/aboutUs', aboutUs);
app.get('/quiz', displayQuiz);

if (dbHasContent) {
  app.put('/quiz', getLocPutdb)
} else { app.post('quiz', getLocPostdb) }

function getHome(request, response) {
  response.render('pages/index');
}

function aboutUs(request, response) {
  response.render('pages/aboutUs');
}

function displayQuiz(request, response) {
  response.render('pages/quiz');
}

function getLocPostdb(request, response) {
// invoke the geocode function, assign it to a variable

let { hunger, interest, music} = request.body;
let sql = 'INSERT INTO user_info (hunger, interest, music) VALUES ($1, $2, $3);';
let safeValues =  [hunger, interest, music];
client.query(sql, safeValues);
response.redirect('/result'); 
}

function getLocPutdb(request, response) {
  // invoke the geocode function, assign it to a variable 
  let { hunger, interest, music} = request.body;
  let sql = 'UPDATE user_info hunger=$1, interest=$2, music=$3 WHERE user_id=1;';
  let safeValues =  [hunger, interest, music];
  client.query(sql, safeValues);
  response.redirect('/result'); 
  }


app.use('*', (request, response) => {
  response.status(404).send('page not found');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
