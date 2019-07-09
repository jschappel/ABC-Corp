const connection = require('../Database/database')
const AuxQueries = require('./utils/abstract_queries')

/* --- Queries --- */

/**
 * getRole: retrieves a single role from db based on the id passes
 * @param {String} id the id of the role to be queried
 * @returns {Promise} Promise is resolved if there is one role associated with an id, otherwise promise is rejected
 */
async function getRole(id) {
    try{
        const sql = `SELECT * FROM role WHERE role_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [id])
        if (resultArray.length < 1) throw( {sqlMessage: `No role with id:${id} exists.`} )
        else if(resultArray.length > 1) throw( {sqlMessage: `To many roles with id:${id}. Please contact database admin to resolve issue.`} )
        else {
            const result = resultArray[0]
            return {
                id: result.role_id,
                date_created: result.date_created,
                last_update: result.last_update,
                role: result.role,
                create: result.c === 1 ? true : false,
                read: result.r === 1 ? true : false,
                update: result.u === 1 ? true : false,
                delete: result.d === 1 ? true : false
            }
        }
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getRoles: retrieves all roles from the db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getRoles() {
    try{
        const sql = `SELECT * FROM role`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
        return resultArray.map( obj => {
            return {
                id: obj.role_id,
                date_created: obj.date_created,
                last_update: obj.last_update,
                role: obj.role,
                create: obj.c === 1 ? true : false,
                read: obj.r === 1 ? true : false,
                update: obj.u === 1 ? true : false,
                delete: obj.d === 1 ? true : false
            }
        })
    }
    catch(error){
        return Promise.reject(error)
    }
}


/* --- Mutations --- */

/**
 * createRole: Adds a role to the database
 * @param {String} role_name The name of the role you wish to create
 * @param {Boolean} create roles create permissions
 * @param {Boolean} read roles read permissions
 * @param {Boolean} update roles update permissions
 * @param {Boolean} del roles delete permissions
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function createRole(role_name, create, read, update, del) {
    try {
        const sql = `INSERT INTO role(role, c, r, u, d) VALUES(?, ?, ?, ?, ?)`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [role_name, create, read, update, del])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * updateRole: Updates a specified role in the database
 * @param {String} role_id The id of the role that you wish to change
 * @param {String} role_name The name of the role you wish to create
 * @param {Boolean} create roles create permissions
 * @param {Boolean} read roles read permissions
 * @param {Boolean} update roles update permissions
 * @param {Boolean} del roles delete permissions
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function updateRole(role_id, role_name, create, read, update, del) {
    try{
        const sql = `UPDATE role SET role = ?, c = ?, r = ?, u = ?, d = ? WHERE role_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [role_name, create, read, update, del, role_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * getRoleAccounts: Returns the accounts associated the the given role
 * @param {Integer} role_id the id of the role that you wish to query on
 * @returns {Promise} The promise contains an array of account objects
 */
async function getRoleAccounts(role_id) {
    try {
        const sql = `SELECT * from account WHERE fk_role_id = ?`
        const results = await AuxQueries.selectQuery(connection, sql, [role_id])
        return results.map( obj => {
            return {
                id: obj.account_id,
                username: obj.username,
                password: obj.password,
                role_id: obj.fk_role_id,
                date_created: obj.date_created,
                last_update: obj.last_update    
            }
        })
    }
    catch(error) {
        return Promise.reject(error)
    }
}

module.exports = {
    getRole,
    getRoles,
    createRole,
    updateRole,
    getRoleAccounts,
}