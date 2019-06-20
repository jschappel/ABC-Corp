const Vendor = require('../../SQL/vendor')
const { UserInputError } = require('apollo-server-express')
const { getAddress } = require('../../SQL/address')


const resolvers = {
    Query: {
        vendor: (parent, { id }) => {
            return Vendor.getVendor(id)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },
        vendors: () => {
            return Vendor.getVendors()
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Mutation: {
        createVendor: (parent, {name, phone_number, email, address_id}) => {
            return Vendor.createVendor(name, phone_number, email, address_id)
            .then( result => result )
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateVendor: (parent, {id, name, phone_number, email, address_id}) => {
            return Vendor.updateVendor(id, name, phone_number, email, address_id)
            .then( result => result )
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Vendor: {
        address: ({address_id}) => {
            return getAddress(address_id)
            .then( result => result )
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        leases: ({id}) => {
            return Vendor.getVendorLeases(id)
            .then( results => results )
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }
}

module.exports = resolvers