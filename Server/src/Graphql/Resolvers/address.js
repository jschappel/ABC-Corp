const {UserInputError} = require('apollo-server-express')
const Address = require('../../SQL/address')

const resolvers = {
    Query: {
        address: (parent, {id}) => {
            return Address.getAddress(id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        addresses: () => {
            return Address.getAddresses()
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }

    },

    Mutation: {

    },

    Address: {
        city: (parent, args) => {

        }
    }
}

module.exports = resolvers