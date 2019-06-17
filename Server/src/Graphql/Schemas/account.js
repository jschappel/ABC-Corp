const { gql } = require('apollo-server-express')

module.exports = gql`
    """A Account holds the account details of every ABC Corp employee"""
    type Account implements ABCtable {
        id: ID!
        date_created: String!
        last_update: String!
        username: String!
        password: String
        role: Role!
    }

    extend type Query {
        """Retrieves the account associated with the given id"""
        account(id: ID!): Account
        """Retrieves all accounts that are in the database"""
        accounts: [Account!]!
    }

    extend type Mutation {
        """Creates and adds a account to the database"""
        createAccount(username: String!, password: String!, role_id: ID!): Boolean!
        """Updates the account that is associated with the given id"""
        updateAccount(id: ID!, username: String!, password: String!, role_id: ID!): Boolean!
    }

`