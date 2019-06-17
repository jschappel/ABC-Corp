const { gql } = require('apollo-server-express')

module.exports = gql`
    """A office is a building owned by ABC Corp"""
    type Office implements ABCtable {
        id: ID!
        date_created: String!
        last_update: String!
        phone_number: String!
        service_number: String!
        active: Boolean!
        employees: [Employee!]!
        address: Address!
        rooms: [Room!]!
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
        createOffice(office_name: String!, phone_number: String!, service_number: ID!, active: Boolean!): Boolean!
        """Updates the model that is associated with the given id"""
        updateModel(id: ID!, office_name: String!, phone_number: String!, service_number: ID!, active: Boolean!): Boolean!
        """Soft deletes am office from the the database"""
        deleteOffice(id: ID!): Boolean!
    }

`