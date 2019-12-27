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

// routes
app.get('/', getHome);
app.post('/result', getYelpResults);

function getHome(request, response) {
    response.render('pages/index');
}

app.use('*', (request, response) => {
    response.status(404).send(`page not found`);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
