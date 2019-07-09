const {UserInputError} = require('apollo-server-express')
const Account = require('../../SQL/account')
const { getRole } = require('../../SQL/role')


const resolvers = {
    Query: {
        account: (parent, {id}) => {
            return Account.getAccount(id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        accounts: () => {
            return Account.getAccounts()
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Mutation: {
        createAccount: (parent, {username, password, role_id}) => {
            return Account.signUp(username, password, role_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateAccount: (parent, {id, username, password, role_id}) => {
            return Account.updateAccount(id, username, password, role_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        login: (parent, { username, password }, context) => {
            return Account.login(username, password)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Account: {
        role: (parent) => {
            return getRole(parent.role_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }
}


module.exports = resolvers