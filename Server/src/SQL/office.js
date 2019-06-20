const connection = require('../Database/database')
const AuxQueries = require('./abstract_queries')

/* --- Queries --- */

/**
 * getOffice: retrieves a single office type from db based on the id passes
 * @param {String} id the id of the office to be queried
 * @returns {Promise} Promise is resolved if there is one office associated with an id, otherwise promise is rejected
 */
async function getOffice(id) {
    try{
        const sql = `SELECT * FROM office WHERE office_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [id])
        if (resultArray.length < 1) throw( {sqlMessage: `No office with id:${id} exists.`} )
        else if(resultArray.length > 1) throw( {sqlMessage: `To many offices with id:${id}. Please contact database admin to resolve issue.`} )
        else {
            const result = resultArray[0]
            return {
                id: result.office_id,
                office: result.office,
                phone_number: result.phone_number,
                service_number: result.equipment_contact,
                date_created: result.date_created,
                last_update: result.last_update,
                address_id: result.fk_address_id,
                active: result.active
            }
        }
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getOffices: retrieves all offices from the db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getOffices() {
    try{
        const sql = `SELECT * FROM office`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
        return resultArray.map( obj => {
            return {
                id: obj.office_id,
                office: obj.office,
                phone_number: obj.phone_number,
                service_number: obj.equipment_contact,
                date_created: obj.date_created,
                last_update: obj.last_update,
                address_id: obj.fk_address_id,
                active: obj.active
            }
        })
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getOfficesByStatus: Gets the active or inactive offices with ABC Corp
 * @param {Boolean} status The status of the office. True if in use else false.
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getOfficesByStatus(status) {
    try{
        const sql = `SELECT * FROM office WHERE active = ${status === true ? 1 : 0}`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
        return resultArray.map( obj => {
            return {
                id: obj.office_id,
                office: obj.office,
                phone_number: obj.phone_number,
                service_number: obj.equipment_contact,
                date_created: obj.date_created,
                last_update: obj.last_update,
                address_id: obj.fk_address_id,
                active: obj.active
            }
        })
    }
    catch(error) {
        return Promise.reject(error)
    }

}


/* --- Mutations --- */

/**
 * createOffice: Adds a office to the database
 * @param {String} office_name The name of the office
 * @param {String} phone_number The phone number of the office   
 * @param {String} service_number The phone number for the office service line
 * @param {Integer} status 1 if active, 0 if inactive
 * @param {Integer} address_id The id of the address where the office is located
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function createOffice(office_name, phone_number, service_number, status, address_id) {
    try {
        const sql = `INSERT INTO office(office, phone_number, equipment_number, active, fk_address_id) VALUES(?, ?, ?, ?, ?)`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [office_name, phone_number, service_number, status, address_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}


/**
 * updateOffice: Updates a specified office in the database
 * @param {String} office_id the id of the office that you wish to update
 * @param {String} office_name The name of the office
 * @param {String} phone_number The phone number of the office
 * @param {String} service_number The phone number of the office service line
 * @param {Integer} status 1 if active, 0 if inactive
 * @param {String} address_id The id of the address where the office is located
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function updateOffice(office_id, office_name, phone_number, service_number, status, address_id) {
    try{
        const sql = `UPDATE office SET office = ?, phone_number = ? , equipment_number = ?, active = ?, fk_address_id = ? WHERE office_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [office_name, phone_number, service_number, status, address_id, office_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * deleteOffice: Soft deletes an office from the database
 * @param {String} office_id The id of the office that you wish to delete
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function deleteOffice(office_id) {
    try {
        const sql = `UPDATE office SET active = 0 WHERE office_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [office_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * activateOffice: Sets an inactive office to active
 * @param {String} office_id The id of the office that you wish to activate
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function activateOffice(office_id) {
    try {
        const sql = `UPDATE office SET active = 1 WHERE office_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [office_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * getOfficeEmployees: get all employees in a specific office
 * @param {String} office_id The id of the office to query
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getOfficeEmployees(office_id) {
    try {
        const sql = `SELECT * FROM employee WHERE fk_office_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [office_id])
        return resultArray.map( obj => {
            return {
                id: obj.employee_id,
                date_created: obj.date_created,
                last_update: obj.last_update,
                first_name: obj.first_name,
                last_name: obj.last_name,
                phone_number: obj.phone_number,
                work_phone_number: obj.work_phone_number,
                email: obj.email,
                active: obj.active,
                address_id: obj.fk_address_id,
                office_id: obj.fk_office_id,
                account_id: obj.fk_account_id
            }
        })
    }
    catch(error) {
        return Promise.reject(error)
    }
}



module.exports = {
    getOffice,
    getOffices,
    createOffice,
    updateOffice,
    getOfficesByStatus,
    deleteOffice,
    activateOffice,
    getOfficeEmployees,
}