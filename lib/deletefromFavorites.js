'use strict';

const client = require('./client');

let deletefromFavorites = (request, response) => {
  console.log(request.params.apiTableName);
  let expr = request.params.apiTableName;
  switch (expr) {
    case 'events':
      let sqlEvents = 'DELETE FROM events_favs WHERE title=$1;';
      let safeValueEvents = [request.body.title];
      client.query(sqlEvents, safeValueEvents);
      break;
    case 'yelp':
      let sqlYelp = 'DELETE FROM yelp_favs WHERE id=$1;';
      let safeValueYelp = [request.body.id];
      client.query(sqlYelp, safeValueYelp);
      break;
    case 'news':
      let sqlNews = 'DELETE FROM news_favs WHERE headline=$1;';
      let safeValueNews = [request.body.headline];
      client.query(sqlNews, safeValueNews);
      break;
    case 'music':
      let sqlMusic = 'DELETE FROM music_favs WHERE wikilink=$1;';
      let safeValueMusic = [request.body.wikilink];
      client.query(sqlMusic, safeValueMusic);
      break;
    default:
      console.log('Already deleted');
  }
  response.redirect('/favorites');
};

module.exports = deletefromFavorites;
