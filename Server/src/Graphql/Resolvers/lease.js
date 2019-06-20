const {UserInputError} = require('apollo-server-express')
const Lease = require('../../SQL/lease')
const { getVendor } = require('../../SQL/vendor')
const resolvers = {
    Query: {
        lease: (parent, {id}) => {
            return Lease.getLease(id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        leases: () => {
            return Lease.getLeases()
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        activeLeases: () => {
            return Lease.getLeasesByStatus(true)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        inactiveLeases: () => {
            return Lease.getLeasesByStatus(false)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }

    },

    Mutation: {
        createLease: (parent, {lease_start, lease_end, vendor_id}) => {
            return Lease.createLease(lease_start, lease_end, vendor_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateLease: (parent, {id, lease_start, lease_end, vendor_id}) => {
            return Lease.updateLease(id, lease_start, lease_end, vendor_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Lease: {
        vendor: ({ vendor_id }) => {
            return getVendor(vendor_id)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }
}

module.exports = resolvers