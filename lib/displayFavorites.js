'use strict';

const client = require('./client');

let displayFavorites = (request, response) => {

  let getEventsTable = () => {
    let sqlEvents = 'SELECT * FROM events_favs;';
    return client.query(sqlEvents)
      .then(results => {
        return results.rows;
      })
      .catch(error => console.error(error));
  };

  let getNewsTable = () => {
    let sqlNews = 'SELECT * FROM news_favs;';
    return client.query(sqlNews)
      .then(results => {
        return results.rows;
      })
      .catch(error => console.error(error));
  };

  let getYelpTable = () => {
    let sqlYelp = 'SELECT * FROM yelp_favs;';
    return client.query(sqlYelp)
      .then(results => {
        return results.rows;
      })
      .catch(error => console.error(error));
  };

  let getMusicTable = () => {
    let sqlMusic = 'SELECT * FROM music_favs;';
    return client.query(sqlMusic)
      .then(results => {
        return results.rows;
      })
      .catch(error => console.error(error));
  };

  Promise.all([getEventsTable(), getNewsTable(), getYelpTable(), getMusicTable()])
    .then(result => {
      let counter = 0;
      result.forEach(array => {
        counter += array.length;
      });
      if (counter === 0) {
        response.render('pages/nofavorites');
      }
      else {
        response.render('pages/displayfavs', { eventsList: result[0], newsList: result[1], restaurantList: result[2], musicList: result[3], displayFavs: true, });
      }
    })
    .catch(error => console.error(error));
};

module.exports = displayFavorites;
