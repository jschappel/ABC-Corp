const {UserInputError} = require('apollo-server-express')
const Address = require('../../SQL/address')
const { getCity } = require('../../SQL/city')

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
        createAddress: (parent, {address1, address2, district, postal_code, city_id}) => {
            return Address.createAddress(address1, address2, district, postal_code, city_id)
            .then (result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateAddress: (parent, {id, address1, address2, district, postal_code, city_id}) => {
            return Address.updateAddress(id, address1, address2, district, postal_code, city_id)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Address: {
        city: ({city_id}) => {
            return getCity(city_id)
            .then( results => results )
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }
}

module.exports = resolvers