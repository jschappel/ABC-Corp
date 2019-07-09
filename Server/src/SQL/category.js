const connection = require('../Database/database')
const AuxQuery = require('./utils/abstract_queries')


/* --- Queries --- */

/**
 * getCategory: retrieves a single category from db based on id
 * @param {String} id the id of the category to be queried
 * @returns {Promise} Promise is resolved if there is one category associated with an id, otherwise promise is rejected
 */
async function getCategory(id) {
    try {
        const sql = `SELECT * FROM category WHERE category_id = ?`
        const results =  await AuxQuery.selectQuery(connection, sql, [id])
        if (results.length < 1) throw( {sqlMessage: `No category with id:${id} exists.`} )
        else if(results.length > 1) throw( {sqlMessage: `To many categories with id:${id}. Please contact database admin to resolve issue.`} )
        else {
            const result = results[0]
            return {
                id: result.category_id,
                date_created: result.date_created,
                last_update: result.last_update,
                category: result.category,
            }
        }
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * getCategories: retrieves all categories from db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getCategories(){
    try {
        const sql = `SELECT * FROM category`
        const results =  await AuxQuery.selectQuery(connection, sql, [])
        return results.map( obj => {
            return {
                id: obj.category_id,
                date_created: obj.date_created,
                last_update: obj.last_update,
                category: obj.category
            }
        })
    }
    catch(error){
        return Promise.reject(error)
    }
}


/* --- Mutations --- */

/**
 * createCategory: Adds a category to the database
 * @param {String} category_name the name of the category that you wish to create
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function createCategory(category_name) {
    try {
        const sql = `INSERT INTO category(category) VALUES(?)`
        const result = await AuxQuery.insertOrUpdateQuery(connection, sql, [category_name])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}


/**
 * updateCategory: Updates a specified category in the database
 * @param {String} category_id the id of the category that you wish to change
 * @param {String} category_name the name that you wish to change the category to
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function updateCategory(category_id, category_name) {
    try{
        const sql = `UPDATE category SET category = ? WHERE category_id = ?`
        const result = await AuxQuery.insertOrUpdateQuery(connection, sql, [category_name, category_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}


/**
 * getCategoryModels: Retrieves all models that are classified under the given category
 * @param {String} id the id of the category
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getCategoryModels(id) {
    try {
        const sql = `SELECT * FROM model where fk_category_id = ?`
        const results = await AuxQuery.selectQuery(connection, sql, [id])
        return results.map( obj => {
            return {
                id: obj.model_id,
                model_name: obj.model_name,
                model_number: obj.model_number,
                date_created: obj.date_created,
                last_update: obj.last_update,
                category_id: obj.fk_category_id
            }
        })
    }
    catch(error) {
        return Promise.reject(error)
    }
    
}


module.exports = {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    getCategoryModels,
}