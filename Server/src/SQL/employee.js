const connection = require('../Database/database')
const AuxQueries = require('./utils/abstract_queries')

/* --- Queries --- */

/**
 * getEmployee: retrieves a single employee type from db based on the id passed
 * @param {String} id the id of the employee to be queried
 * @returns {Promise} Promise is resolved if there is one employee associated with an id, otherwise promise is rejected
 */
async function getEmployee(id) {
    try{
        const sql = `SELECT * FROM employee WHERE employee_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [id])
        if (resultArray.length < 1) return null
        else if(resultArray.length > 1) throw( {sqlMessage: `To many employees with id:${id}. Please contact database admin to resolve issue.`} )
        else {
            const result = resultArray[0]
            return {
                id: result.employee_id,
                date_created: result.date_created,
                last_update: result.last_update,
                first_name: result.first_name,
                last_name: result.last_name,
                phone_number: result.phone_number,
                work_phone_number: result.work_phone_number,
                email: result.email,
                active: result.active,
                address_id: result.fk_address_id,
                office_id: result.fk_office_id,
                account_id: result.fk_account_id
            }
        }
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getEmployees: retrieves all employees from the db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getEmployees() {
    try{
        const sql = `SELECT * FROM employee`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
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
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getEmployeesByStatus: Gets the active or inactive employees with ABC Corp
 * @param {Boolean} status The status of the employee. True if in use else false.
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getEmployeesByStatus(status) {
    try{
        const sql = `SELECT * FROM employee WHERE active = ${status === true ? 1 : 0}`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
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

/**
 * getEmployeeEquipment: retrieves all equipment that is registered under the given employee
 * @param {String} id The id of the employee to query
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getEmployeeEquipment(id) {
    try {
        const sql = `SELECT * FROM equipment WHERE fk_employee_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [id])
        return resultArray.map( obj => {
            return {
                id: obj.equipment_id,
                date_created: obj.date_created,
                last_update: obj.last_update,
                serial_number: obj.serial_number,
                active: obj.active,
                warranty_end_date: obj.warranty_end_date,
                lease_id: obj.fk_lease_id,
                vendor_id: obj.fk_vendor_id,
                model_id: obj.fk_model_id,
                employee_id: obj.fk_employee_id,
                room_id: obj.fk_room_id,
            }
        })
    }
    catch(error) {
        return Promise.reject(error)
    }
}


/* --- Mutations --- */

/**
 * createEmployee: Adds a employee to the database
 * @param {String} first_name The first name of the employee
 * @param {String} last_name The last name of the employee
 * @param {String} phone_number The phone number of the employee (Not work number)
 * @param {String} work_phone_number The work number of the employee
 * @param {String} email The email of the employee
 * @param {String} status 1 if active, 0 if inactive
 * @param {String} address_id The id of the address of where the employee resides
 * @param {String} office_id The id of the employees office
 * @param {String} account_id The id of the account associated with the employee
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function createEmployee(first_name, last_name, phone_number, work_phone_number, email, status, address_id, office_id, account_id) {
    try {
        const sql = `INSERT INTO employee(first_name, last_name, phone_number, work_phone_number, email, active, fk_address_id, fk_office_id, fk_account_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [first_name, last_name, phone_number, work_phone_number, email, status, address_id, office_id, account_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}


/**
 * updateEmployee: Updates a specified employee in the database
 * @param {*} employee_id The id of the employee that you wish to update
 * @param {String} first_name The first name of the employee
 * @param {String} last_name The last name of the employee
 * @param {String} phone_number The phone number of the employee (Not work number)
 * @param {String} work_phone_number The work number of the employee
 * @param {String} email The email of the employee
 * @param {String} status 1 if active, 0 if inactive
 * @param {String} address_id The id of the address of where the employee resides
 * @param {String} office_id The id of the employees office
 * @param {String} account_id The id of the account associated with the employee
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function updateEmployee(employee_id, first_name, last_name, phone_number, work_phone_number, email, status, address_id, office_id, account_id) {
    try{
        const sql = `UPDATE employee SET first_name = ?, last_name = ?, phone_number = ?, work_phone_number = ?, email = ?, active = ?, fk_address_id = ?, office_id = ?, account_id = ? WHERE employee_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [first_name, last_name, phone_number, work_phone_number, email, status, address_id, office_id, account_id, employee_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * deleteEmployee: Soft deletes an employee from the database
 * @param {String} employee_id The id of the office that you wish to delete
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function deleteEmployee(employee_id) {
    try {
        const sql = `UPDATE employee SET active = 0 WHERE employee_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [employee_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * activateEmployee: Sets an inactive employee to active
 * @param {String} employee_id The id of the employee that you wish to activate
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function activateEmployee(employee_id) {
    try {
        const sql = `UPDATE employee SET active = 1 WHERE employee_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [employee_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

module.exports = {
    getEmployee,
    getEmployees,
    createEmployee,
    updateEmployee,
    getEmployeesByStatus,
    deleteEmployee,
    activateEmployee,
    getEmployeeEquipment,
}