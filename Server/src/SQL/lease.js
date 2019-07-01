const connection = require('../Database/database')
const AuxQueries = require('./abstract_queries')

/* --- Queries --- */

/**
 * getLease: retrieves a single lease type from db based on the id passes
 * @param {String} id the id of the lease to be queried
 * @returns {Promise} Promise is resolved if there is one office associated with an id, otherwise promise is rejected
 */
async function getLease(id) {
    try{
        const sql = `SELECT * FROM lease WHERE lease_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [id])
        if (resultArray.length < 1) return null
        else if(resultArray.length > 1) throw( {sqlMessage: `To many leases with id:${id}. Please contact database admin to resolve issue.`} )
        else {
            const result = resultArray[0]
            return {
                id: result.lease_id,
                date_created: result.date_created,
                last_update: result.last_update,
                lease_start: result.start_date,
                lease_end: result.end_date,
                vendor_id: result.fk_vendor_id
            }
        }
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getLeases: retrieves all leases from the db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getLeases() {
    try{
        const sql = `SELECT * FROM lease ORDER BY end_date DESC`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
        return resultArray.map( obj => {
            return {
                id: obj.lease_id,
                date_created: obj.date_created,
                last_update: obj.last_update,
                lease_start: obj.start_date,
                lease_end: obj.end_date,
                vendor_id: obj.fk_vendor_id
            }
        })
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getLeasesByStatus: Gets the active or inactive leases with ABC Corp
 * @param {Boolean} status The status of the lease. True if in use else false.
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getLeasesByStatus(status) {
    try{
        const sql = `SELECT * FROM lease WHERE end_date ${status === true ? '>' : '<'} NOW() ORDER BY end_date DESC`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
        return resultArray.map( obj => {
            return {
                id: obj.lease_id,
                date_created: obj.date_created,
                last_update: obj.last_update,
                lease_start: obj.start_date,
                lease_end: obj.end_date,
                vendor_id: obj.fk_vendor_id
            }
        })
    }
    catch(error) {
        return Promise.reject(error)
    }

}


/* --- Mutations --- */

/**
 * createLease: Adds a lease to the database
 * @param {MySQL Timestamp} start_date The time that the lease starts
 * @param {MySQL Timestamp} end_date The time that the lease ends
 * @param {String} vendor_id The id of the vendor who owns the lease
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function createLease(start_date, end_date, vendor_id) {
    try {
        const sql = `INSERT INTO lease(start_date, end_date, fk_vendor_id VALUES(?, ?, ?)`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [start_date, end_date, vendor_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}


/**
 * updateLease: Updates a specified lease in the database
 * @param {String} lease_id The id of the lease that you wish to update
 * @param {MySQL Timestamp} start_date The time that the lease starts
 * @param {MySQL Timestamp} end_date THe time that the lease ends
 * @param {String} vendor_id The id of the vendor who owns the lease
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function updateLease(lease_id, start_date, end_date, vendor_id) {
    try{
        const sql = `UPDATE lease SET start_date = ?, end_date = ?, fk_vendor_id = ? WHERE lease_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [start_date, end_date, vendor_id, lease_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}



module.exports = {
    getLease,
    getLeases,
    getLeasesByStatus,
    createLease,
    updateLease,
}