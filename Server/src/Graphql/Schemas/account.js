const { gql } = require('apollo-server-express')

module.exports = gql`
    """A Account holds the account details of every ABC Corp employee"""
    type Account implements ABCtable {
        id: ID!
        date_created: Date!
        last_update: Date!
        username: String!
        password: String!
        role: Role!
        employee: Employee
    }

    extend type Query {
        """The current account that is logged in"""
        me: Account
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
        """Authenticates a user by making user the data provided matches the data on file"""
        login(username: String!, password: String!): AuthPayload!
    }
`