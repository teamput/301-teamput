'use strict';

// deletes ALL information
const client = require('./client');

function deleteDbInfo(request, response) {
  let sql = 'DELETE FROM user_info;';
  client.query(sql);
  response.redirect('/');
}

module.exports = deleteDbInfo;
