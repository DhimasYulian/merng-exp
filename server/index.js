const {ApolloServer, PubSub} = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const {MONGODB} = require('./config')

const pubSub = new PubSub()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubSub}) 
})

const PORT = process.env.PORT || 5000

const startServer =  () => {
    server.listen(PORT, async () => {
        try {
            await mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
            console.log(`Server running on port ${PORT}`)
        } catch (error) {
            throw new Error(error)
        }
    })
}

startServer()