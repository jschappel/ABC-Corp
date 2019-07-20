const { gql } = require('apollo-server-express')

module.exports = gql`
    """A model is a particular design or version of a product"""
    type Model implements ABCtable {
        id: ID!
        date_created: Date!
        last_update: Date!
        model_name: String!
        model_number: String!
        category: Category!
    }

    extend type Query {
        """Retrieves the model associated with the given id"""
        model(id: ID!): Model
        """Retrieves all models that are in the database"""
        models: [Model!]!
    }

    extend type Mutation {
        """Creates and adds a model the the database"""
        createModel(model_name: String!, model_number: String!, category_id: ID!): Boolean!
        """Updates the model that is associated with the given id"""
        updateModel(id: ID!, model_name: String!, model_number: String!, category_id: ID!): Boolean!
    }
`