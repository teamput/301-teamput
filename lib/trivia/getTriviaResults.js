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
      if (rawTriviaArray) {
        let triviaArray = rawTriviaArray.map(question => new Trivia(question));
        return triviaArray;
      }
      else {
        console.error('error');
      }
    })
    .catch(error => console.error(error));
}


function Trivia(triviaObj) {
  if (triviaObj.category) {
    this.category = triviaObj.category || '(no category available)';
  }
  if (triviaObj.question) {
    this.question = triviaObj.question || '(no question available)';
  }
  if (triviaObj.correct_answer) {
    this.correct_answer = triviaObj.correct_answer || '(no correct answer available)';
  }
  if (triviaObj.incorrect_answers) {
    this.incorrect_answers = triviaObj.incorrect_answers || '(no incorrect answers available)';
  }
}

module.exports = getTriviaResults;
