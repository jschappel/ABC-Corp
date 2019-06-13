const connection = require('../Database/database')


/* --- Queries --- */

/**
 * getCity: retrieves a single city from db based on id
 * @param {String} city_id: the id of the city to be queried
 */
function getCity(city_id){
    const sql = 'Select * from City where city_id = ?'

    return new Promise( (resolve, reject) => {
        connection.query(sql, [city_id], (error, results, fields) =>{
            if(error) return reject(error)
            if(results.length < 1){
                return reject({sqlMessage: `No country with id:${city_id} exists.`})
            }
           
            const city = {
                id: results[0].city_id,
                city: results[0].city,
                date_created: results[0].date_created,
                last_update: results[0].last_update,
                country_id: results[0].fk_country_id
            }
            resolve(city)
        })
    })
}

/**
  * getCities: retrieves an array of all cities in db
 */
function getCities() {
    const sql = 'Select * from City'

    return new Promise( (resolve, reject) => {
        connection.query(sql, (error, results, fields) =>{
            if(error) return reject(error)
            resolve(results.map( obj => {
                return {
                    id: obj.city_id,
                    city: obj.city,
                    date_created: obj.date_created,
                    last_update: obj.last_update,
                    country_id: obj.fk_country_id   
                }
            }))
        })
    })
}



/* --- Mutations --- */


/**
 * createCity: inserts given city into db
 * @param {String} city: name of city
 * @param {*} country_id: the id of the country that the city is located in
 */
function createCity(city, country_id){
    return new Promise((resolve, reject) => {
        connection.beginTransaction(error => {
            if(error){
                return connection.rollback(() => {
                    reject(error)
                })
            }

            const sql = `Insert into City(city, fk_country_id) Values(?, ?)`
            connection.query(sql, [city, country_id], (error, results, fields) => {
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

/**
 * updateCity: updates city in db based on given id
 * @param {String} city_id: id of city
 * @param {String} city: name of city
 * @param {String} country_id: id of country that city is associated with
 */
function updateCity(city_id, city, country_id){
    return new Promise((resolve, reject) => {
        connection.beginTransaction(error => {
            if(error){
                return connection.rollback(() => {
                    reject(error)
                })
            }

            const sql = `Update City SET city =  ?, country_id = ? where city_id = ?`
            connection.query(sql, [city, country_id, city_id],  (error, results, fields) => {
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

/**
 * getCityAddresses: retrieves all addresses associated with given city id.
 * @param {String} city_id
 */
function getCityAddresses(city_id) {
    const sql = 'SELECT * FROM Address WHERE fk_city_id = ?'
    return new Promise( ( resolve, reject ) => {
        connection.query(sql, [city_id], ( error, results, fields) => {
            if (error) return reject(error)
             resolve(results.map( obj => {
                return {
                    id: obj.address_id,
                    address1: obj.address1,
                    address2: obj.address2,
                    district: obj.district,
                    postal_code: obj.postal_code,
                    city_id: obj.fk_city_id,
                    date_created: obj.date_created,
                    last_update: obj.last_update
                }
            }))
        })
    })
}

module.exports = {
    getCity,
    getCities,
    createCity,
    updateCity,
    getCityAddresses,
}
