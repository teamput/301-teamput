/* eslint-disable camelcase */
'use strict';

const superagent = require('superagent');

function getNewsResults(userObj) {
  // let today = new Date();
  // let year = today.getFullYear();
  // let month = today.getMonth() + 1;
  // let day = today.getDate();

  // let todaysDate = `${year}-${month}-${day}`;

  let url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.NYT_API_KEY}`;
  // `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.NYT_API_KEY}&glocations=${userObj.location}&pub_date=${todaysDate}`;

  return superagent.get(url)
    .then(results => {
      let articles = results.body.results;
      if (articles) {
        let articlesArray = articles.map(article => new News(article));
        let returnArray;
        if (articlesArray.length > 3) {
          returnArray = articlesArray.slice(0, 3);
        } else {
          returnArray = articlesArray;
        }
        return returnArray;
      }
      else {
        console.error('error');
      }
    })
    .catch(error => console.error(error));
}

function News(newsObj) {
  if (newsObj.title) {
    this.headline = newsObj.title || '(no headline available)';
  }
  if (newsObj.abstract) {
    this.abstract = newsObj.abstract;
  } else if (newsObj.snippet) {
    this.abstract = newsObj.snippet || '(no snippet available)';
  }
  if (newsObj.url) {
    this.web_url = newsObj.url || '(no url available)';
  }
  if (newsObj.published_date) {
    this.date = newsObj.published_date || '(no published date available)';
  }
  if (newsObj.byline) {
    this.byline = newsObj.byline || '(no byline info available)';
  }
  // if (newsObj.media[0].media - metadata[0].url) {
  //   this.image = newsObj.media[0].media - metadata[0].url || '(no url available)';
  // }
  if (newsObj.source) {
    this.source = newsObj.source || '(no source available)';
  }
}

module.exports = getNewsResults;
