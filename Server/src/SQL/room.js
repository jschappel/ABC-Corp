const connection = require('../Database/database')
const AuxQueries = require('./abstract_queries')

/* --- Queries --- */

/**
 * getRoom: retrieves a single room type from db based on the id passes
 * @param {String} id the id of the room to be queried
 * @returns {Promise} Promise is resolved if there is one room associated with an id, otherwise promise is rejected
 */
async function getRoom(id) {
    try{
        const sql = `SELECT * FROM room WHERE room_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [id])
        if (resultArray.length < 1) throw( {sqlMessage: `No room with id:${id} exists.`} )
        else if(resultArray.length > 1) throw( {sqlMessage: `To many rooms with id:${id}. Please contact database admin to resolve issue.`} )
        else {
            const result = resultArray[0]
            return {
                id: result.room_id,
                room: result.room,
                floor: result.floor,
                date_created: result.date_created,
                last_update: result.last_update,
                active: result.active,
                office_id: result.fk_office_id
            }
        }
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getRooms: retrieves all rooms from the db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getRooms() {
    try{
        const sql = `SELECT * FROM room`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
        return resultArray.map( obj => {
            return {
                id: obj.room_id,
                room: obj.room,
                floor: obj.floor,
                date_created: obj.date_created,
                last_update: obj.last_update,
                active: obj.active,
                office_id: obj.fk_office_id
            }
        })
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getRoomsByStatus: Gets the active or inactive rooms in ABC Corp offices
 * @param {Boolean} status The status of the room. True if in use else false.
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getRoomsByStatus(status) {
    try{
        const sql = `SELECT * FROM room WHERE active = ${status === true ? 1 : 0}`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
        return resultArray.map( obj => {
            return {
                id: obj.room_id,
                room: obj.room,
                floor: obj.floor,
                date_created: obj.date_created,
                last_update: obj.last_update,
                active: obj.active,
                office_id: obj.fk_office_id
            }
        })
    }
    catch(error) {
        return Promise.reject(error)
    }

}

/**
 * getRoomsByFloor: Gets all rooms on the given floor across all ABC Corp offices
 * @param {Integer} floor The floor number
* @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getRoomsByFloor(floor) {
    try {
        const sql = `SELECT * FROM room WHERE floor = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [floor])
        if(resultArray.length < 1) throw({sqlMessage: `Sorry floor ${floor} does not exists.`})
        else {
            return resultArray.map( obj => {
                return {
                    id: obj.room_id,
                    room: obj.room,
                    floor: obj.floor,
                    date_created: obj.date_created,
                    last_update: obj.last_update,
                    active: obj.active,
                    office_id: obj.fk_office_id
                }
            })
        }
    }
    catch(error) {
        return Promise.reject(error)
    }
}


/* --- Mutations --- */

/**
 * createRoom: Adds a room to the database
 * @param {String} room_name The name of the room
 * @param {Integer} floor The number of the floor
 * @param {Integer} status 1 if active, 0 if inactive
 * @param {String} office_id The id of the office that the room is located in
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function createRoom(room_name, floor, status, office_id) {
    try {
        const sql = `INSERT INTO room(room, floor, active, fk_office_id) VALUES(?, ?, ?, ?)`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [room_name, floor, status, office_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}


/**
 * updateRoom: Updates a specified room in the database
 * @param {String} room_id The id of the room that you wish to update
 * @param {String} room_name The name of the room
 * @param {Integer} floor The number of the floor
 * @param {Integer} status 1 if active, 0 if inactive
 * @param {String} office_id The id of the office that the room is located in
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function updateRoom(room_id, room_name, floor, status, office_id) {
    try{
        const sql = `UPDATE room SET room = ?, floor = ?, active = ?, fk_office_id = ? WHERE room_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [room_name, floor, status, office_id, room_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * deleteRoom: Soft deletes a room from the database
 * @param {String} room_id The id of the room that you wish to delete
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function deleteRoom(room_id) {
    try {
        const sql = `UPDATE room SET active = 0 WHERE room_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [room_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * activateRoom: Sets an inactive room to active
 * @param {String} room_id The id of the room that you wish to activate
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function activateRoom(room_id) {
    try {
        const sql = `UPDATE room SET active = 1 WHERE room_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [room_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}



module.exports = {
    getRoom,
    getRooms,
    createRoom,
    updateRoom,
    getRoomsByStatus,
    deleteRoom,
    activateRoom,
    getRoomsByFloor,
}