/* eslint-disable camelcase */
'use strict';

function Event(eventObj) {
  this.url = eventObj.url;
  this.title = eventObj.title;
  this.venue_name = eventObj.venue_name;
  this.city_name = eventObj.city_name;
  this.start_time = eventObj.start_time;
  this.description = eventObj.description;
}

module.exports = Event;
