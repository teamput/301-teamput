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

// api JS
const getYelpResults = require('./lib/yelp/yelp');
const getEventsResults = require('./lib/events/getEventsResults');

// routes
app.get('/', getHome);
app.get('/result', showAllResults);
// app.get('/result', getEventsResults);
app.get('/aboutUs', aboutUs);
app.get('/quiz', displayQuiz);
app.put('/quiz', getLocPutdb)
app.delete('/result', deleteDbInfo);

function deleteDbInfo(request, response) {
    let location = request.location;
    let sql = 'DELETE FROM user_info WHERE location=$1;';
    let safeValues = [location];
    client.query(sql, safeValues);
    response.redirect('/');
}

function showAllResults(request, response) {
    let sql = 'SELECT * FROM user_info;';
    client.query(sql)
        .then(results => {
           let answers = results.rows[0];
           return getYelpResults(request, response, answers);
        //    getEventsResults(request, response, answers);

      
        //    response.render('pages/result', {

           });
        })

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
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`
    superagent.get(url)

        .then(results => {
            let locationObject = {
                location: results.body.results[0].formatted_address,
                lat: results.body.results[0].geometry.location.lat,
                lng: results.body.results[0].geometry.location.lng,
            }

            let { hunger, interest, music, } = request.body;
            let sql = 'UPDATE user_info SET hunger=$1, interest=$2, music=$3, location=$5, lat=$6, long=$7 WHERE user_id=$4 returning user_id;';
            let safeValues = [hunger, interest, music, 1, locationObject.location, locationObject.lat, locationObject.lng];
            client.query(sql, safeValues);
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
