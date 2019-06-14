const Category = require('../../SQL/category')
const { UserInputError } = require('apollo-server-express')


const resolvers = {
    Query: {
        category: (parent, { id }) => {
            return Category.getCategory(id)
            .then( result => result )
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },
        categories: () => {
            return Category.getCategories()
            .then(results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Mutation: {
        createCategory: (parent, {name}) => {
            return Category.createCategory(name)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateCategory: (parent, {id, name}) => {
           return Category.updateCategory(id, name)
           .then(result => result)
           .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },
}

module.exports = resolvers