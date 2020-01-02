/* eslint-disable no-case-declarations */
'use strict';

const client = require('./client');

let savetoFavorites = (request, response) => {
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
          if (results.rows.length === 0) {
            let sqlEvents2 = 'INSERT INTO events_favs (url, title, venue_name, city_name, start_time, description) VALUES ($1, $2, $3, $4, $5, $6)';
            let { url, title, venue_name, city_name, start_time, description, } = request.body;
            let safeValuesEvents2 = [url, title, venue_name, city_name, start_time, description];
            client.query(sqlEvents2, safeValuesEvents2)
              .catch(error => console.error(error));
          }
          else {
            console.log('Already in table');
            // console.log(request.body);
            // response.status(200).send({ data: request.body, });
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
          if (results.rows.length === 0) {
            let sqlMusic2 = 'INSERT INTO music_favs (name, teaser, wikilink, youtubelink) VALUES ($1, $2, $3, $4);';
            let { name, teaser, wikilink, youtubelink, } = request.body;
            let safeValuesMusic2 = [name, teaser, wikilink, youtubelink];
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
      console.log('Already in table');
  }
};

module.exports = savetoFavorites;
