const {AuthenticationError} = require('apollo-server')
const jwt = require("jsonwebtoken")
const {SECRET_KEY} = require('../config')

const checkAuth = (context) => {
    const authHeader = context.req.headers.authorization
    if(authHeader){
        const token = authHeader.split("Bearer ")[1]
        if(token){
            try {
                const user = jwt.verify(token, SECRET_KEY)
                return user
            } catch (error) {
                throw new AuthenticationError("Invalid/Expired Token")
            }
        }
        throw new Error("Token format is wrong")
    }
    throw new Error("Authorization header must be provided")
}

module.exports = checkAuth