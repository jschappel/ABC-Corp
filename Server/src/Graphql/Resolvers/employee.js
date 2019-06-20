const {UserInputError} = require('apollo-server-express')
const Employee = require('../../SQL/employee')
const { getAddress } = require('../../SQL/address')
const { getOffice } = require('../../SQL/office')
const { getAccount } = require('../../SQL/account')

const resolvers = {
    Query: {
        employee: (parent, {id}) => {
            return Employee.getEmployee(id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        employees: () => {
            return Employee.getEmployees()
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        activeEmployees: () => {
            return Employee.getEmployeesByStatus(true)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})

        },

        inactiveEmployees: () => {
            return Employee.getEmployeesByStatus(false)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Mutation: {
        createEmployee: (parent, { first_name, last_name, phone_number, work_phone_number, email, status, address_id, office_id, account_id }) => {
            return Employee.createEmployee(first_name, last_name, phone_number, work_phone_number, email, status, address_id, office_id, account_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateEmployee: (parent, { id, first_name, last_name, phone_number, work_phone_number, email, status, address_id, office_id, account_id }) => {
            return Employee.updateEmployee(id, first_name, last_name, phone_number, work_phone_number, email, status, address_id, office_id, account_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        deleteEmployee: (parent, { id }) => {
            return Employee.deleteEmployee(id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        reactivateEmployee: (parent, { id }) => {
            return Employee.activateEmployee(id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Employee: {
        address: (parent, args) => {
            return getAddress(parent.address_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        office: (parent, args) => {
            return getOffice(parent.office_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        account: (parent, args) => {
            return getAccount(parent.account_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },
/*
        reservations: (parent, args) => {

        },

        inventory: (parent, args) => {

        }
*/
    }
}

module.exports = resolvers