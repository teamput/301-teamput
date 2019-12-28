'use strict';

const express = require('express');
const app = express();
require('ejs');
require('dotenv').config();
const methodOverride = require('method-override');
const superagent = require('superagent');

app.use(methodOverride('_method'));

const PORT = process.env.PORT || 3001;
const client = require('./lib/client');

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded());


// // api JS
const getYelpResults = require('./lib/yelp/yelp');
const getEventsResults = require('./lib/events/getEventsResults');

// routes
app.get('/', getHome);
app.get('/result', showAllResults);
// app.get('/result', getEventsResults);
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

function showAllResults(request, response) {
  let sql = 'SELECT * FROM user_info;';
  client.query(sql)
    .then(results => {
      let answers = results.rows[0];
      let promises = [getYelpResults(answers), getEventsResults(answers)];
      Promise.all(promises)
        .then(result => {
          response.render('pages/result', { restaurantList: result[0], eventsList: result[1], });
        })
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


//gets form data, calls geocode api, and updates that data to the database
function getLocPutdb(request, response) {
  let city = request.body.location;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`;
  superagent.get(url)
    .then(results => {
      let locationObject = {
        location: results.body.results[0].formatted_address,
        lat: results.body.results[0].geometry.location.lat,
        lng: results.body.results[0].geometry.location.lng,
      };

      let { hunger, interest, music, } = request.body;

      let sql = 'SELECT * FROM user_info;';
      client.query(sql)
        .then(results => {
          if (results.rows.length > 0) {

            let sql = 'UPDATE user_info SET lat=$1, long=$2, location=$3, hunger=$4, interest=$5, music=$6 WHERE user_id IS NOT NULL;';
            let safeValues = [locationObject.lat, locationObject.lng, locationObject.location, hunger, interest, music];
            client.query(sql, safeValues);
          } else {
            let sql = 'INSERT INTO user_info (lat, long, location, hunger, interest, music) VALUES ($1, $2, $3, $4, $5, $6);';
            let safeValues = [locationObject.lat, locationObject.lng, locationObject.location, hunger, interest, music];
            client.query(sql, safeValues);
          }

        })
        .catch(err => console.error(err));

      response.redirect('/result');

    })
    .catch(error => console.error(error));

}




app.use('*', (request, response) => {
  response.status(404).send('page not found');
});
client.connect(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})
