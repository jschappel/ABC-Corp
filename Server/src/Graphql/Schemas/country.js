const { gql} = require('apollo-server-express')

module.exports = gql`
    type Country implements ABCtable{
        id: ID!
        date_created: Date!
        last_update: Date!
        country: String!
        cities: [City!]
    }

    extend type Query{
        country(id: ID!): Country!
        countries: [Country!]!
    }

    extend type Mutation{
        createCountry(country: String!): Boolean!
        updateCountry(id: ID!, country: String!): Boolean!
    }
`