const {UserInputError} = require('apollo-server-express')
const Office = require('../../SQL/office')
const { getAddress } = require('../../SQL/address')


const resolvers = {
    Query: {
        office: (parent, { id }) => {
            return Office.getOffice(id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        offices: () => {
            return Office.getOffices()
            .then(results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        activeOffices: () => {
            return Office.getOfficesByStatus(true)
            .then(results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})            
        },

        inactiveOffices: () => {
            return Office.getOfficesByStatus(false)
            .then(results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})  
        }
    }, 

    Mutation: {
        createOffice: (parent, {office_name, phone_number, service_number, active, address_id} ) => {
            return Office.createOffice(office_name, phone_number, service_number, active, address_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})

        },

        updateOffice: (parent, {id, office_name, phone_number, service_number, active, address_id} ) => {
            return Office.createOffice(id, office_name, phone_number, service_number, active, address_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        deleteOffice: (parent, { id }) => {
            return Office.deleteOffice(id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        reactivateOffice: (parent, { id }) => {
            return Office.activateOffice(id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Office: {
        address: (parent) => {
            return getAddress(parent.address_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },
        
        rooms: (parent, args) => {

        },

        employees: (parent, { id }) => {
            return Office.getOfficeEmployees(id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }
}


module.exports = resolvers