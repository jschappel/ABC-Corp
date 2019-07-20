const { gql} = require('apollo-server-express')

module.exports = gql`
    type City implements ABCtable{
        id: ID!
        date_created: Date!
        last_update: Date!
        city: String!
        country: Country!
        addresses: [Address!]
    }

    extend type Query{
        city(id: ID!): City!
        cities: [City!]!
    }

    extend type Mutation{
        createCity(city: String!, country_id: ID!): Boolean!
        updateCity(id: ID!, city: String, country_id: ID!): Boolean!
    }
`