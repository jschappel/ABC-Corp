const { gql} = require('apollo-server-express')

module.exports = gql`
    type Address implements ABCtable{
        id: ID!
        date_created: String!
        last_update: String!
        address1: String!
        address2: String
        district: String!
        postal_code: String
        city: City!
    }

    extend type Query{
        address(id: ID!): Address!
        addresses: [Address!]!
        addressesByCity(city_id: ID!): [Address!]!
    }

    extend type Mutation{
        createAddress(address1: String!, address2: String, district: String!, postal_code: String, city_id: ID!): Address!
        updateAddress(id: ID!, address1: String, address2: String, district: String, postal_code: String, city_id: ID): Address!
    }
`