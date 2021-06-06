require('dotenv').config()
module.exports = {
    MONGODB: `mongodb+srv://dbmerng:${process.env.MONGODB_PASSWORD}@merng-1-cluster.6dcgq.mongodb.net/db-merng?retryWrites=true&w=majority`,
    SECRET_KEY: process.env.SECRET_KEY
}