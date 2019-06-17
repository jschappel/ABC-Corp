const connection = require('../Database/database')
const AuxQueries = require('./abstract_queries')

/* --- Queries --- */

/**
 * getAccount: retrieves a single account from db based on the id passes
 * @param {String} id the id of the account to be queried
 * @returns {Promise} Promise is resolved if there is one account associated with an id, otherwise promise is rejected
 */
async function getAccount(id) {
    try{
        const sql = `SELECT * FROM account WHERE account_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [id])
        if (resultArray.length < 1) throw( {sqlMessage: `No account with id:${id} exists.`} )
        else if(resultArray.length > 1) throw( {sqlMessage: `To many accounts with id:${id}. Please contact database admin to resolve issue.`} )
        else {
            const result = resultArray[0]
            return {
                id: result.account_id,
                date_created: result.date_created,
                last_update: result.last_update,
                username: result.username,
                password: result.password,
                role_id: result.fk_role_id
            }
        }
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getAccounts: retrieves all accounts from the db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getAccounts() {
    try{
        const sql = `SELECT * FROM account`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
        return resultArray.map( obj => {
            return {
                id: obj.account_id,
                date_created: obj.date_created,
                last_update: obj.last_update,
                username: obj.username,
                password: obj.password,
                role_id: obj.fk_role_id
            }
        })
    }
    catch(error){
        return Promise.reject(error)
    }
}


/* --- Mutations --- */

/**
 * createAccount: Adds a account to the database
 * @param {String} username The username for the account
 * @param {String} password The password for the account
 * @param {Integer} role_id The id of the role permissions that the account will have
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function createAccount(username, password, role_id) {
    try {
        const sql = `INSERT INTO account(username, password, fk_role_id) VALUES(?, ?, ?)`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [username, password, role_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * updateAccount: Updates a specified account in the database
 * @param {String} account_id The id of the account that you wish to change
 * @param {String} username The username of the account
 * @param {String} password The password of the account
 * @param {Integer} role_id The id of the role permissions that the account will have
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function updateAccount(account_id, username, password, role_id) {
    try{
        const sql = `UPDATE account SET username = ?, password = ?, fk_role_id = ? WHERE account_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [username, password, role_id, account_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

module.exports = {
    getAccount,
    getAccounts,
    createAccount,
    updateAccount,
}