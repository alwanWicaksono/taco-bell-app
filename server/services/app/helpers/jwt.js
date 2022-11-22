const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = (payload) => jwt.sign(payload, process.env.Secret_Key);

const readToken = (token) => jwt.verify(token, process.env.Secret_Key);
module.exports = {
    createToken,
    readToken
};