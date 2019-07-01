const connection = require('../Database/database')
const AuxQueries = require('./abstract_queries')

/* --- Queries --- */

/**
 * getModel: retrieves a single model type from db based on the id passes
 * @param {String} id the id of the model to be queried
 * @returns {Promise} Promise is resolved if there is one model associated with an id, otherwise promise is rejected
 */
async function getModel(id) {
    try{
        const sql = `SELECT * FROM model WHERE model_id = ?`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [id])
        if (resultArray.length < 1) throw( {sqlMessage: `No model with id:${id} exists.`} )
        else if(resultArray.length > 1) throw( {sqlMessage: `To many models with id:${id}. Please contact database admin to resolve issue.`} )
        else {
            const result = resultArray[0]
            return {
                id: result.model_id,
                model_name: result.model_name,
                model_number: result.model_number,
                date_created: result.date_created,
                last_update: result.last_update,
                category_id: result.fk_category_id
            }
        }
    }
    catch(error){
        return Promise.reject(error)
    }
}

/**
 * getModels: retrieves all models from the db
 * @returns {Promise} Promise is resolved as long as no error occurs in the query. The promise contains an array of objects. 
 * The array can be empty.
 */
async function getModels() {
    try{
        const sql = `SELECT * FROM model ORDER BY model_name DESC`
        const resultArray = await AuxQueries.selectQuery(connection, sql, [])
        return resultArray.map( obj => {
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
    catch(error){
        return Promise.reject(error)
    }
}


/* --- Mutations --- */

/**
 * createModel: Adds a model to the database
 * @param {String} model_name The name of the model you wish to create
 * @param {String} model_number The model number of the model you wish to create
 * @param {String} category_id The id of the category that the model falls under
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function createModel(model_name, model_number, category_id) {
    try {
        const sql = `INSERT INTO model(model_name, model_number, fk_category_id) VALUES(?, ?, ?)`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [model_name, model_number, category_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

/**
 * updateModel: Updates a specified model in the database
 * @param {String} model_id The id of the model that you wish to change
 * @param {String} model_name The name that you wish to change the model to
 * @param {String} model_number The model number that you wish to change the model to
 * @param {String} category_id The id of the category that you wish to change the model to
 * @returns {Promise} Promise is resolved as log as no error occurs during the transaction. Promise will
 * resolve true if the transaction was successfully otherwise promise will resolve false
 */
async function updateModel(model_id, model_name, model_number, category_id) {
    try{
        const sql = `UPDATE model SET model_name = ?, model_number = ? , fk_category_id = ? WHERE model_id = ?`
        const result = await AuxQueries.insertOrUpdateQuery(connection, sql, [model_name, model_number, category_id, model_id])
        return result
    }
    catch(error) {
        return Promise.reject(error)
    }
}

module.exports = {
    getModel,
    getModels,
    createModel,
    updateModel
}