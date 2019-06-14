const { gql } = require('apollo-server-express')

module.exports = gql`
    """A category is a class or division of equipment"""
    type Category implements ABCtable{
        id: ID!
        date_created: String!
        last_update: String!
        category: String!
    }

    extend type Query {
        """Retrieves the category associated with the given id"""
        category(id: ID!): Category!
        """Retrieves all vendors that are in the database"""
        categories: [Category!]!
    }

    extend type Mutation {
        """Creates and adds a category the the database"""
        createCategory(name: String!): Boolean!
        """Updates the category that is associated with the given id"""
        updateCategory(id: ID!, name: String!): Boolean!
    }
`