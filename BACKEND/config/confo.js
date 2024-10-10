const env = require('dotenv').config()

exports.config = {
    COOKIE_EXPIRE : process.env.COOKIE_EXPIRE,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRE : process.env.JWT_EXPIRE,
    GROQ_API_KEY : process.env.GROQ_API_KEY
}