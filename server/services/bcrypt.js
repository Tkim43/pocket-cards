const bcrypt = require('bcrypt-nodejs');
const { promisify } = require('util');

bcrypt.compare = promisify(bcrypt.compare);
bcrypt.genSalt = promisify(bcrypt.genSalt);
bcrypt.hash = promisify(bcrypt.hash);

module.exports = bcrypt;
