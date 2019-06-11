const connection = require('../Database/database')


/**
 *Queries
 */

 /**
  * getCountry: retrieves a single country from db based on id
  * @param {Number} country_id: the id of the country to be queried
  */
 function getCountry(country_id){
    const sql = 'Select * from Country where country_id = ?'

    return new Promise( (resolve, reject) => {
        connection.query(sql, [country_id], (error, results, fields) =>{
            if(error) reject(error)
            if(results.length < 1){
                return reject({sqlMessage: `No country with id:${country_id} exists.`})
            }
           
            const country = {
                id: results[0].country_id,
                date_created: results[0].date_created,
                last_update: results[0].last_update,
                country: results[0].country
            }
            resolve(country)
        })
    })
}

/**
  * getCountries: retrieves an array of all countries in db
  */
 function getCountries() {
    const sql = 'Select * from Country'

    return new Promise( (resolve, reject) => {
        connection.query(sql, (error, results, fields) =>{
            if(error) return reject(error)
            resolve(results.map( obj => {
                return {
                    id: obj.country_id,
                    date_created: obj.date_created,
                    last_update: obj.last_update,
                    country: obj.country
                }
            }))
        })
    })
}

/**
 *Mutators
 */

 /**
  * createCountry inserts given country into db
  * @param {String} country: name of country 
  */
function createCountry(country){
    return new Promise((resolve, reject) => {
        connection.beginTransaction(error => {
            if(error) reject(error)

            const sql = `Insert into Country(country) Values(?)`
            connection.query(sql, [country], (error, results, fields) => {
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
 * updateCountry: updates country in db based on given id
 * @param {String} country_id: id of country
 * @param {String} country: name of country
 */
function updateCountry(country_id, country){
    return new Promise((resolve, reject) => {
        connection.beginTransaction(error => {
            if(error) reject(error)

            const sql = `Update Country SET country =  ? where country_id = ?`
            connection.query(sql, [country, country_id],  (error, results, fields) => {
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
    getCountry,
    getCountries,
    createCountry,
    updateCountry
}
