const express = require('express')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const resolvers = require('./Graphql/Resolvers/index')
//const models = require('./SQL/index')
const typeDefs = require('./Graphql/Schemas/index')
const jwt = require('express-jwt')

const app = express()

/**
 * Makes a GraphQLSchema instanced schema
 */
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
		requireResolversForResolveType: false,
	},
})

/**
 * Create an Apollo server and supply it with the schema and resolvers
 * context: option field which can be used to used to inject dependencies from the outside to the resolver function.
 *      EX: A signed in users id could be set to the context to all future queries can access it.
*/
const server = new ApolloServer({
    schema,
    /* context: {
        models, // Models is passed to the resolvers as context
        me: models.users[1] // Simulates a user that is logged in
    } */
})

// Add express as middleware
server.applyMiddleware({ app, path: '/graphql'})


// Have the express server listen on port 5000
app.listen(5000, () => console.log(`Server listening on port 5000`))