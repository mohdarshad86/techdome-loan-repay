const bcrypt = require('bcrypt');

const matchPassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}

module.exports = matchPassword