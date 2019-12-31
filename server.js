/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
'use strict';

// server set up
const express = require('express');
const app = express();
require('ejs');
require('dotenv').config();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const PORT = process.env.PORT || 3001;
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded());

// app.get('/resultexists', deliverResults);

// let deliverResults = (request, response) {

// }

// function JS
const client = require('./lib/client');
const getLocPutdb = require('./lib/getlocputdb');
const savetoFavorites = require('./lib/savetofavorites');
const displayFavorites = require('./lib/displayFavorites');
const showAllResults = require('./lib/showAllResults');
const deletefromFavorites = require('./lib/deletefromFavorites');
// const deleteDbInfo = require('./lib/deleteDbInfo');

// routes
app.get('/', getHome);
app.get('/result', showAllResults);
app.get('/aboutUs', aboutUs);
app.get('/quiz', displayQuiz);
app.put('/quiz', getLocPutdb);
app.delete('/favorites/:apiTableName', deletefromFavorites);
// app.delete('/', deleteDbInfo);
app.post('/result/:apiTableName', savetoFavorites);
app.get('/favorites', displayFavorites);

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
