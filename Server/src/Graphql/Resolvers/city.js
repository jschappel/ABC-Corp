const {UserInputError} = require('apollo-server-express')
const City = require('../../SQL/city')
const {getCountry} = require('../../SQL/country')

const resolvers = {
     Query: {
       city: (parent, args) => {
            return City.getCity(args.id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
       },

       cities: () => {
           return City.getCities()
           .then(result => result)
           .catch(error => {throw new UserInputError(error.sqlMessage)})
       }
    },

    Mutation: {
        createCity: (parent, args) => {
            return City.createCity(args.city, args.country_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateCity: (parent, args) => {
            return City.updateCity(args.id, args.city, args.country_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    City: {
        country: (parent, args) => {
            return getCountry(parent.country_id)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        addresses: (parent, args) => {
            return City.getCityAddresses(parent.id)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }
}

module.exports = resolvers