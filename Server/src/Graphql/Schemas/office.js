const { gql } = require('apollo-server-express')

module.exports = gql`
    """A office is a building owned by ABC Corp"""
    type Office implements ABCtable {
        id: ID!
        date_created: String!
        last_update: String!
        office: String!
        phone_number: String!
        service_number: String!
        active: Boolean!
        address: Address!
        rooms: [Room!]!
        employees: [Employee!]!
    }

    extend type Query {
        """Retrieves the office associated with the given id"""
        office(id: ID!): Office
        """Retrieves all offices (active and inactive) that are in the database"""
        offices: [Office!]!
        """Retrieves all active offices that are in the database"""
        activeOffices: [Office!]!
        """Retrieves all inactive offices that are in the database"""
        inactiveOffices: [Office!]!
    }

    extend type Mutation {
        """Creates and adds a model the the database"""
        createOffice(office_name: String!, phone_number: String!, service_number: ID!, active: Boolean!, address_id: ID!): Boolean!
        """Updates the model that is associated with the given id"""
        updateOffice(id: ID!, office_name: String!, phone_number: String!, service_number: ID!, active: Boolean!, address_id: ID!): Boolean!
        """Soft deletes an office from the database"""
        deleteOffice(id: ID!): Boolean!
        """Reactivates an office in the database"""
        reactivateOffice(id: ID!): Boolean!
    }
`