/* eslint-disable camelcase */
'use strict';

const superagent = require('superagent');

function getNewsResults(userObj) {
  let search = userObj.interest;

  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=${process.env.NYT_API_KEY}&glocations=${userObj.location}`;

  return superagent.get(url)
    .then(results => {
      let articles = results.body.response.docs;
      if (articles) {
        let articlesArray = articles.map(article => new News(article));
        return articlesArray;
      }
      else {
        console.error('error');
      }
    })
    .catch(error => console.error(error));
}

function News(newsObj) {
  if (newsObj.headline.main) {
    this.headline = newsObj.headline.main || '(no headline available)';
  }
  if (newsObj.abstract) {
    this.abstract = newsObj.abstract;
  } else if (newsObj.snippet) {
    this.abstract = newsObj.snippet || '(no snippet available)';
  }
  if (newsObj.web_url) {
    this.web_url = newsObj.web_url || '(no url available)';
  }
  if (newsObj.pub_date) {
    this.date = newsObj.pub_date || '(no published date available)';
  }
  if (newsObj.byline.original) {
    this.byline = newsObj.byline.original || '(no published date available)';
  }
  // if (newsObj.multimedia[0].url) {
  //   this.image = newsObj.multimedia[0].url || '(no url available)';
  // }
  if (newsObj.source) {
    this.source = newsObj.source || '(no source available)';
  }
}

module.exports = getNewsResults;
