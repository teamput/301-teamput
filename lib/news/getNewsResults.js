/* eslint-disable camelcase */
'use strict';

const superagent = require('superagent');

function getNewsResults(userObj) {
  let search = userObj.interest;

  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=${process.env.NYT_API_KEY}&glocations=${userObj.location}`;

  return superagent.get(url)
    .then(results => {
      let articles = results.body.response.docs;

      console.log(articles[0].multimedia);
      let articlesArray = articles.map(article => new News(article));

      return articlesArray;
    })
    .catch(error => console.error(error));
}


function News(newsObj) {
  this.headline = newsObj.headline.main;
  if (newsObj.abstract) {
    this.abstract = newsObj.abstract;
  } else {
    this.abstract = newsObj.snippet;
  }
  this.web_url = newsObj.web_url;
  this.date = newsObj.pub_date;
  this.byline = newsObj.byline.original;
  this.image = newsObj.multimedia[0].url;
  this.source = newsObj.source;
}

module.exports = getNewsResults;
