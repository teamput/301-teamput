'use strict';

const superagent = require('superagent');
const client = require('./client');

//gets form data, calls geocode api, and updates that data to the database
function getLocPutdb(request, response) {
  let city = request.body.location;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`;
  superagent.get(url)
    .then(results => {
      // checks for valid city; if not valid, render an error page, else do database work
      if (results.body.status !== 'OK' || !isNaN(results.body.results[0].address_components[0].long_name, 10)) {
        response.render('pages/wrongcity.ejs');
      }
      else {
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
      }
    })
    .catch(error => console.error(error));
}

module.exports = getLocPutdb;
