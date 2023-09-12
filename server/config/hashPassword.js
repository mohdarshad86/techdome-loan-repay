const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds)
}

module.exports = hashPassword