/* eslint-disable camelcase */
'use strict';

const superagent = require('superagent');

function getTriviaResults(userObj) {
  let category;

  switch (userObj.trivia) {
    case 'animals': category = 27;
      break;
    case 'sports': category = 21;
      break;
    case 'computers': category = 18;
      break;
    case 'celebrities': category = 26;
      break;
    case 'history': category = 23;
      break;
    case 'politics': category = 24;
      break;
    case 'science-nature': category = 17;
      break;
    default: category = 9;
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

function rhtmlSpecialChars(str) {
  if (typeof str === 'string') {
    str = str.replace(/&gt;/ig, ">");
    str = str.replace(/&lt;/ig, "<");
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/&quot;/ig, '"');
    str = str.replace(/&rsquo;/ig, '\'');
    str = str.replace(/&amp;/ig, '&');
  }
  return str;
}

function Trivia(triviaObj) {
  if (triviaObj.category) {
    this.category = triviaObj.category || '(no category available)';
  }
  if (triviaObj.question) {
    this.question = rhtmlSpecialChars(triviaObj.question) || '(no question available)';
  }
  if (triviaObj.correct_answer) {
    this.correct_answer = rhtmlSpecialChars(triviaObj.correct_answer) || '(no correct answer available)';
  }
  if (triviaObj.incorrect_answers) {
    this.incorrect_answers = rhtmlSpecialChars(triviaObj.incorrect_answers) || '(no incorrect answers available)';
  }
}

module.exports = getTriviaResults;
