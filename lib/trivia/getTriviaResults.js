/* eslint-disable camelcase */
'use strict';

const superagent = require('superagent');

function getTriviaResults(userObj) {
  let category = 9; // 9 is general knowledge; sports is 21, celebrities 26, history 23...
  if (userObj.interest === 'sports') {
    category = 21;
  }

  let url = `https://opentdb.com/api.php?amount=5&category=${category}&type=multiple`;

  return superagent.get(url)
    .then(results => {
      let rawTriviaArray = results.body.results;
      let triviaArray = rawTriviaArray.map(question => new Trivia(question));
      return triviaArray;

    })
    .catch(error => console.error(error));
}


function Trivia(triviaObj) {
  this.category = triviaObj.category;
  this.question = triviaObj.question;
  this.correct_answer = triviaObj.correct_answer;
  this.incorrect_answers = triviaObj.incorrect_answers;
}

module.exports = getTriviaResults;
