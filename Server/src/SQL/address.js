const connection = require('../Database/database')

/* --- Queries --- */

/**
 * getAddress: retrieves a single address from db based on id
 * @param {String} address_id the id of the address to be queried
 * @returns {Promise} Promise is resolved if there is one address associated with an id, otherwise promise is rejected
 */
function getAddress(address_id) {
    const sql = `SELECT * FROM address WHERE address_id = ?`

    return new Promise( (resolve, reject) => {
        connection.query( sql, [address_id], ( error, results, fields ) => {
            if(error) return reject(error)
            if(results.length < 1) return reject({sqlMessage: `No country with id:${address_id} exists.`})
            if(results.length > 1) return reject({sqlMessage: `To many address's with id:${address_id}. Please contact database admin to resolve issue.`})
            resolve({
                id: results[0].address_id,
                address1 : results[0].address1,
                address2: results[0].address2,
                district: results[0].district,
                postal_code: results[0].postal_code,
                city_id: results[0].fk_city_id,
                date_created: results[0].date_created,
                last_update: results[0].last_update,
            })
        })
    })
}


/**
 * getAddresses: retrieves a single address from db based on id
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
function getAddresses() {
    const sql = `SELECT * FROM address`

    return new Promise( (resolve, reject) => {
        connection.query( sql, ( error, results, field ) => {
            if(error) return resolve(error)
            resolve(results.map( obj => {
                return {
                    id: obj.address_id,
                    address1: obj.address1,
                    address2: obj.address2,
                    district: obj.district,
                    postal_code: obj.postal_code,
                    city_id: obj.fk_city_id,
                    date_created: obj.date_created,
                    last_update: obj.last_update,
                }
            }))
        })
    })
}


/* --- Mutations --- */

/**
 * createAddress: inserts given address into db
 * @param {String} address1 name of main address
 * @param {String} address2 name of secondary address (can be null)
 * @param {String} district name of state/providence
 * @param {String} postal_code number representing the postal code for the address (can be null)
 * @param {String} city_id the id of the city where the address is located
 * @returns {Boolean} true if the query when through without any errors
 */
function createAddress(address1, address2, district, postal_code, city_id) {
    return new Promise( (resolve, reject) => {
        connection.beginTransaction(error => {
            if(error) return reject(error)

            const sql = `INSERT INTO address(address1, address2, district, postal_code, fk_city_id) VALUES(?, ? , ? ,? ,?)`
            connection.query(sql, [address1, address2, district, postal_code, city_id], ( error, results, fields ) => {
                if(error){
                    return connection.rollback(() => {
                        reject(error)
                    })
                }
                connection.commit( error => {
                    if(error){
                        return connection.rollback(() => {
                            reject(error)
                        })
                    }
                    resolve(true)
                })
            })
        })
    })
}


/**
 * 
 * @param {String} id id of address being updated
 * @param {String} address1 name of main address
 * @param {String} address2 name of secondary address (can be null)
 * @param {String} district name of state/providence
 * @param {String} postal_code number representing the postal code for the address (can be null)
 * @param {String} city_id the id of the city where the address is located
 * @returns {Boolean} true if the query when through without any errors
 */
function updateAddress(id, address1, address2, district, postal_code, city_id) {
    return new Promise( ( resolve, reject ) => {
        connection.beginTransaction( error => {
            if(error){
                return connection.rollback(() => {
                    reject(error)
                })
            }
            const sql = `UPDATE address SET address1 = ?, address2 = ?, district = ?, postal_code = ?, fk_city_id = ? WHERE address_id = ?`
            connection.query(sql, [address1, address2, district, postal_code, city_id, id], ( error, results, fields ) => {
                if(error){
                    return connection.rollback(() => {
                        reject(error)
                    })
                }
                connection.commit( error => {
                    if(error){
                        return connection.rollback(() => {
                            reject(error)
                        })
                    }
                    resolve(true)
                })
            })
        })
    })
}


module.exports = {
    getAddress,
    getAddresses,
    createAddress,
    updateAddress,
}