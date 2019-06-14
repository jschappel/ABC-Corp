const {UserInputError} = require('apollo-server-express')
const Model = require('../../SQL/model')
const { getCategory } = require('../../SQL/category')

const resolvers = {
    Query: {
        model: (parent, {id} ) => {
            return Model.getModel(id)
            .then( result => result )
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        models: () => {
            return Model.getModels()
            .then( results => results )
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Mutation: {
        createModel: (parent, {model_name, model_number, category_id} ) => {
            return Model.createModel(model_name, model_number, category_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateModel: (parent, {id, model_name, model_number, category_id} ) => {
            return Model.updateModel(id, model_name, model_number, category_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Model: {
        category: ( {category_id} ) => {
            return getCategory(category_id)
            .then(results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }
}


module.exports = resolvers