const connection = require('../Database/database')
const AuxQuery = require('./queryFunctions')

/**
 * getCategory: retrieves a single category from db based on id
 * @param {String} id the id of the category to be queried
 * @returns {Promise} Promise is resolved if there is one category associated with an id, otherwise promise is rejected
 */
function getCategory(id) {
    const sql = `SELECT * FROM category WHERE category_id = ?`
    return new Promise( ( resolve, reject ) => {
        connection.query(sql, [id], ( error, results, fields ) => {
            if(error) return reject(error)
            if(results.length < 1) return reject({sqlMessage: `No category with id:${id} exists.`})
            if(results.length > 1) return reject({sqlMessage: `To many categories with id:${id}. Please contact database admin to resolve issue.`})
            const result = results[0]
            resolve({
                id: result.category_id,
                date_created: result.date_created,
                last_update: result.last_update,
                category: result.category,
            })
        })
    })
}


/**
 * getCategory: retrieves a single category from db based on id
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
function getCategories() {
    const sql = `SELECT * FROM categories`

    return new Promise( (resolve, reject) => {
        connection.query( sql, ( error, results, field ) => {
            if(error) return resolve(error)
            resolve(results.map( obj => {
                return {
                    id: obj.category_id,
                    date_created: obj.date_created,
                    last_update: obj.last_update,
                    category: obj.category
                }
            }))
        })
    })
}

function getCategories2() {
    const sql = `SELECT * FROM category`
    return AuxQuery.selectQuery(connection, sql,[])
    .then(results => {
        results.map( obj => {
            return{
                id: obj.category_id,
                date_created: obj.date_created,
                last_update: obj.last_update,
                category: obj.category
            }
        })
    })
    .catch(error => error)
}

async function getCategories3(){
    const sql = `SELECT * FROM category`
    let x =  await AuxQuery.selectQuery(connection, sql,[])
    return x.map( obj => {
        return {
            id: obj.category_id,
            date_created: obj.date_created,
            last_update: obj.last_update,
            category: obj.category
        }
    })
}



module.exports = {
    getCategory,
    getCategories2,
    getCategories3,
}