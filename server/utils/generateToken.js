const {SECRET_KEY} = require('../config')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username,
    }, SECRET_KEY, {expiresIn: "1h"})
    return token
}

module.exports = generateToken