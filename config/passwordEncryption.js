'use strict';

const bcrypt = require('bcrypt-nodejs');

function encryption (password) {
  let salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(password, salt);
};

module.exports = encryption;