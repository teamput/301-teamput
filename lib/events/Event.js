/* eslint-disable camelcase */
'use strict';

function fixEventful(str) {
  let regex = /<\/?[a-z]*>/g;
  return str.replace(regex, '');
}

function rhtmlSpecialChars(str) {
  if (typeof str === 'string') {
    str = str.replace(/&gt;/ig, ">");
    str = str.replace(/&lt;/ig, "<");
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/&#39;/g, "'");
    str = str.replace(/&quot;/ig, '"');
    str = str.replace(/&rsquo;/ig, '\'');
    str = str.replace(/&amp;/ig, '&');
  }
  return str;
}

function Event(eventObj) {
  if (eventObj.url) {
    this.url = eventObj.url || '(no url available)';
  }
  if (eventObj.title) {
    this.title = eventObj.title || '(no title available)';
  }
  if (eventObj.venue_name) {
    this.venue_name = eventObj.venue_name || '(no venue name available)';
  }
  if (eventObj.city_name) {
    this.city_name = eventObj.city_name || '(no city name available)';
  }
  if (eventObj.start_time) {
    eventObj.start_time = new Date(eventObj.start_time);
    eventObj.start_time = eventObj.start_time.toDateString();
    this.start_time = eventObj.start_time || '(no start time available)';
  }
  if (eventObj.description) {
    eventObj.description = fixEventful(eventObj.description);
    eventObj.description = rhtmlSpecialChars(eventObj.description);
    this.description = eventObj.description || '(no description available)';
  }
}

module.exports = Event;
