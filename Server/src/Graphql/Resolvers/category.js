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
            return Category.getCategories3()
            .then(results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Mutation: {
        createCategory: (parent, {}) => {
            
        },

        updateCategory: (parent, {}) => {
           
        }
    },
}

module.exports = resolvers