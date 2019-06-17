const {UserInputError} = require('apollo-server-express')


const resolvers = {
    Query: {
        office: (parent, args) => {

        },

        offices: () => {

        },

        activeOffices: () => {
            
        },

        inactiveOffices: () => {
            
        }
    }, 

    Mutation: {
        createOffice: (parent, args) => {

        },

        updateOffice: (parent, args) => {

        },

        deleteOffice: (parent, args) => {

        }
    }
}


module.exports = resolvers