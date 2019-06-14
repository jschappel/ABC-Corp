/**
 * A auxiliary function for a selection MySQL Query
 * @param {Database connect} db_connection the database connection
 * @param {String} sql a string/template literal containing the sql query
 * @param {*} args_array an array of data that will be placed into the sql string placeholders
 * @return {Promise} A promise containing the query data
 */
function selectQuery(db_connection, sql, args_array) {
    return new Promise( ( resolve, reject ) => {
        db_connection.query(sql, args_array, ( error, results, fields ) => {
            if(error) return reject(error)
            else resolve(results)
        })
    })
}

/**
 * insertOrUpdateQuery: A auxiliary function for a insert and update MySQL Queries
 * @param {Database connect} db_connection the database connection
 * @param {String} sql a string/template literal containing the sql query
 * @param {*} args_array an array of data that will be placed into the sql string placeholders
 * @return {Promise} A promise containing a boolean value. Resolved True if insert/update was successful
 */
function insertOrUpdateQuery(db_connection, sql, args_array) {
    return new Promise( ( resolve, reject ) => {
        db_connection.beginTransaction( error => {
            if(error){
                return db_connection.rollback(() => {
                    reject(error)
                })
            }
            db_connection.query(sql, args_array, ( error, results, fields ) => {
                if(error){
                    return db_connection.rollback(() => {
                        reject(error)
                    })
                }
                db_connection.commit( error => {
                    if(error){
                        return db_connection.rollback(() => {
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
    selectQuery,
    insertOrUpdateQuery,
}