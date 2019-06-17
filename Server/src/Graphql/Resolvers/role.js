const {UserInputError} = require('apollo-server-express')
const Role = require('../../SQL/role')

const resolvers = {
    Query: {
        role: (parent, {id}) => {
            return Role.getRole(id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        roles: () => {
            return Role.getRoles()
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Mutation: {
        createRole: (parent, {role, create, read, update, del}) => {
            return Role.createRole(role, create === true? 1 : 0, read === true? 1 : 0, update === true? 1 : 0, del === true? 1 : 0)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateRole: (parent, {id, role, create, read, update, del}) => {
            return Role.updateRole(id, role, create === true? 1 : 0, read === true? 1 : 0, update === true? 1 : 0, del === true? 1 : 0)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Role: {
        accounts: (parent, args) => {
            return Role.getRoleAccounts(parent.id)
            .then(results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }

}


module.exports = resolvers