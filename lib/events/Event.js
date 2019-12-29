/* eslint-disable camelcase */
'use strict';

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
    this.start_time = eventObj.start_time || '(no start time available)';
  }
  if (eventObj.description) {
    this.description = eventObj.description || '(no description available)';
  }
}

module.exports = Event;
