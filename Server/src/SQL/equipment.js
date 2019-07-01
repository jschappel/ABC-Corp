const connection = require('../Database/database')
const AuxQueries = require('./abstract_queries')

/* --- Queries --- */

/**
 * getSpecificEquipment: retrieves a single piece of equipment from db based on id
 * @param {String} id the id of the equipment to be queried
 * @returns {Promise} Promise is resolved if there is one piece of equipment associated with an id, otherwise promise is rejected
 */
async function getSpecificEquipment(id) {
    try {
        const sql = `SELECT * FROM equipment WHERE equipment_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [id])
        if(resultArray.length < 1) return reject({sqlMessage: `No equipment with id:${id} exists.`})
        else if(resultArray.length > 1) return reject({sqlMessage: `To many pieces of equipment with id:${id}. Please contact database admin to resolve issue.`})
        else {
            const result = resultArray[0]
            return {
                id: result.equipment_id,
                date_created: result.date_created,
                last_update: result.last_update,
                serial_number: result.serial_number,
                active: result.active,
                warranty_end_date: result.warranty_end_date,
                lease_id: result.fk_lease_id,
                vendor_id: result.fk_vendor_id,
                model_id: result.fk_model_id,
                employee_id: result.fk_employee_id,
                room_id: result.fk_room_id,
            }
        }
    }

    catch(error) {
        return Promise.reject(error)
    }
}


/**
 * getAllEquipment: retrieves an array of all equipment (active and inactive) in the db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects.
 * The array can be empty.
 */
async function getAllEquipment() {
    try {
        const sql = `SELECT * FROM equipment ORDER BY serial_number DESC`
        const resultArray =  await AuxQueries.selectQuery(connection, sql, [])
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


/**
 * getEquipmentByStatus: Gets the active or inactive equipment with ABC Corp
 * @param {Boolean} status The status of the equipment. True if in use else false.
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getEquipmentByStatus(status) {
    try {
        const sql = `SELECT * FROM equipment WHERE active = ${status === true ? 1 : 0} ORDER BY serial_number DESC`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
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
 * createEquipment: inserts a piece of equipment into the db
 * @param {String} serial_number the serial number of the equipment
 * @param {Date} warranty_end_date The end date of the warranty. Can be null
 * @param {Integer} status true if active, false if inactive
 * @param {String} model_id The id of the model that the equipment falls under
 * @param {String} vendor_id The id of the vendor of which the equipment was leased/purchased from
 * @param {String} lease_id The id of the lease if there is one. Can be null
 * @param {String} employee_id The id of the employee if there is one. Can be null
 * @param {String} room_id The id of the room if there is one. Can be null
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function createEquipment(serial_number, warranty_end_date, status, model_id, vendor_id, lease_id, employee_id, room_id) {
    try {
        const sql = `INSERT INTO equipment(serial_number, warranty_end_date, active, fk_model_id, fk_vendor_id, lease_id, fk_employee_id, fk_room_id) VALUES(?, ?, ? ,?, ?, ?, ?, ?)`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [serial_number, warranty_end_date, status, model_id, vendor_id, lease_id, employee_id, room_id])
        return result
    }
    catch(error) {
        Promise.reject(error)
    }
}

/**
 * updateEquipment: Updates a piece of equipment in the database
 * @param {String} equipment_id The id of the equipment to be updated
 * @param {String} serial_number the serial number of the equipment
 * @param {Date} warranty_end_date The end date of the warranty. Can be null
 * @param {Boolean} status true if active, false if inactive
 * @param {String} model_id The id of the model that the equipment falls under
 * @param {String} vendor_id The id of the vendor of which the equipment was leased/purchased from
 * @param {String} lease_id The id of the lease if there is one. Can be null
 * @param {String} employee_id The id of the employee if there is one. Can be null
 * @param {String} room_id The id of the room if there is one. Can be null
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function updateEquipment(equipment_id, serial_number, warranty_end_date, status, model_id, vendor_id, lease_id, employee_id, room_id) {
    try {
        const sql = `UPDATE equipment SET serial_number = ?, warranty_end_date = ?, active = ?, fk_model_id = ?, fk_vendor_id = ?, fk_lease_id = ?, fk_employee_id = ?, fk_room_id = ? WHERE equipment_id = ?)`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [serial_number, warranty_end_date, status, model_id, vendor_id, lease_id, employee_id, room_id, equipment_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * deleteEquipment: Soft deletes a piece of equipment from the database
 * @param {String} equipment_id The id of the equipment that you wish to delete
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function deleteEquipment(equipment_id) {
    try {
        const sql = `UPDATE equipment SET active = 0 WHERE equipment_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [equipment_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * activateEquipment: Sets an inactive piece of equipment to active
 * @param {String} equipment_id The id of the equipment that you wish to activate
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function activateEquipment(equipment_id) {
    try {
        const sql = `UPDATE equipment SET active = 1 WHERE equipment_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [office_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

module.exports = {
    getSpecificEquipment,
    getAllEquipment,
    getEquipmentByStatus,
    updateEquipment,
    createEquipment,
    deleteEquipment,
    activateEquipment,
}