const connection = require('../Database/database')


/* --- Queries --- */

/**
 * getVendor: retrieves a single vendor from db based on id
 * @param {String} id the id of the vendor to be queried
 * @returns {Promise }Promise is resolved if there is one vendor associated with an id, otherwise promise is rejected
 */
function getVendor(id) {
    const sql = `SELECT * FROM vendor WHERE vendor_id = ?`
    return new Promise( ( resolve, reject ) => {
        connection.query(sql, [id], ( error, results, fields ) => {
            if(error) return reject(error)
            if(results.length < 1) return reject({sqlMessage: `No vendor with id:${id} exists.`})
            if(results.length > 1) return reject({sqlMessage: `To many vendor's with id:${id}. Please contact database admin to resolve issue.`})
            const result = results[0]
            resolve({
                id: result.vendor_id,
                date_created: result.date_created,
                last_update: result.last_update,
                name: result.name,
                phone_number: result.phone,
                email: result.email,
                address_id: result.fk_address_id
            })
        })
    })
}


/**
 * getVendors: retrieves an array of all countries in db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects.
 * The array can be empty.
 */
function getVendors() {
    const sql = `SELECT * FROM vendor`

    return new Promise( ( resolve, reject ) => {
        connection.query(sql, ( error, results, fields ) => {
            if(error) return reject(error)
            resolve( results.map( obj => {
                return {
                    id: obj.vendor_id,
                    date_created: obj.date_created,
                    last_update: obj.last_update,
                    name: obj.name,
                    phone_number: obj.phone,
                    email: obj.email,
                    address_id: obj.fk_address_id
                }
            }))
        })
    })
}


/* --- Mutations --- */

/**
 * createVendor: inserts given address into the db
 * @param {String} name the name of the vendor
 * @param {String} phone_number the vendor's phone number
 * @param {String} email the vendor's email address
 * @param {String} address_id the id of the address that the vendor is located at
 */
function createVendor(name, phone_number, email, address_id) {
    return new Promise( (resolve, reject) => {
        connection.beginTransaction(error => {
            if(error) return reject(error)

            const sql = `INSERT INTO vendor(name, phone, email, fk_address_id) VALUES(?, ? , ? ,?)`
            connection.query(sql, [name, phone_number, email, address_id], ( error, results, fields ) => {
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
 * updateVendor: updates vendor in db based on given id
 * @param {String} vendor_id id of the vender to be altered
 * @param {String} name name of the vendor
 * @param {String} phone_number the vendor's phone number
 * @param {String} email the vendor's email
 * @param {String} address_id the id of the address that the vendor is located at
 */
function updateVendor(vendor_id, name, phone_number, email, address_id){
    return new Promise((resolve, reject) => {
        connection.beginTransaction(error => {
            if(error){
                return connection.rollback(() => {
                    reject(error)
                })
            }

            const sql = `UPDATE vendor SET name =  ?, phone = ?, email = ?, fk_address_id = ? WHERE vendor_id = ?`
            connection.query(sql, [name, phone_number, email, address_id, vendor_id],  (error, results, fields) => {
                if(error){
                    return connection.rollback(() => {
                        reject(error)
                    })
                }
                else{
                    connection.commit( error => {
                        if(error){
                            return connection.rollback(() => {
                                reject(error)
                            })
                        }
                        resolve(true)
                    })
                }
            })
        })
    })
}

module.exports = {
    getVendor,
    getVendors,
    createVendor,
    updateVendor
}