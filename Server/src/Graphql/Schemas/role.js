const { gql } = require('apollo-server-express')

module.exports = gql`
    """A role defines the permissions that are available to an ABC Corp account"""
    type Role implements ABCtable {
        id: ID!
        date_created: String!
        last_update: String!
        role: String!
        create: Boolean!
        read: Boolean!
        update: Boolean!
        delete: Boolean!
        accounts: [Account!]!
    }

    extend type Query {
        """Retrieves the role associated with the given id"""
        role(id: ID!): Role
        """Retrieves all roles that are in the database"""
        roles: [Role!]!
    }

    extend type Mutation {
        """Creates and adds a role to the database"""
        createRole(role: String!, create: Boolean!, read: Boolean!, update: Boolean!, del: Boolean!): Boolean!
        """Updates the role that is associated with the given id"""
        updateRole(id: ID!, role: String!, create: Boolean!, read: Boolean!, update: Boolean!, del: Boolean!): Boolean!
    }

`