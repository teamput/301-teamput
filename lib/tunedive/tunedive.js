/* eslint-disable camelcase */
'use strict';

const superagent = require('superagent');

let getMusicResults = userObj => {
  // request.body contains the answer to "Are you hungry?" (yes/no)
  let favorite = userObj.music;
 
let url = `https://tastedive.com/api/similar?q=${favorite}&k=${process.env.TUNEDIVE_API_KEY}&info=1&limit=5`;
// console.log(url);
    return superagent.get(url)
      
      .then(results => {
        let music = results.body.Similar.Results;
        if (music){
        let musicArr = music.map(artist => new Artist(artist));
        return musicArr;
        }
        else {
          console.error('Sorry, this not available')
        }
      })
      .catch(error => console.error(error));
  };

function Artist(artist) {
  if (artist.Name){
  this.name = artist.Name || 'Artist name N/A';
  }
  if (artist.wTeaser){
  this.teaser = artist.wTeaser || 'Bio N/A';
  }
  if (artist.wUrl){
  this.wikilink = artist.wUrl || 'Wiki N/A';
  }
  if (artist.yUrl){
  this.youtubeLink = artist.yUrl || 'Youtube Video N/A';
  }
}

module.exports = getMusicResults; 