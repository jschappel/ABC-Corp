const {UserInputError} = require('apollo-server-express')
const Country = require('../../SQL/country')

const resolvers = {
     Query: {
       country: (parent, args) => {
            return Country.getCountry(args.id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
       },

       countries: () => {
           return Country.getCountries()
           .then(result => result)
           .catch(error => {throw new UserInputError(error.sqlMessage)})
       }
    },

    Mutation: {
        createCountry: (parent, args) => {
            return Country.createCountry(args.country)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateCountry: (parent, args) => {
            return Country.updateCountry(args.id, args.country)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }


    }
}

module.exports = resolvers