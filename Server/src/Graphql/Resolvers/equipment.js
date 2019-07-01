const {UserInputError} = require('apollo-server-express')
const Equipment = require('../../SQL/equipment')
const { getModel } = require('../../SQL/model')
const { getVendor } = require('../../SQL/vendor')
const { getLease } = require('../../SQL/lease')


const resolvers = {
    Query: {
        equipmentSingle: (parent, { id }) => {
            return Equipment.getSpecificEquipment(id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        equipmentAll: () => {
            return Equipment.getAllEquipment()
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        activeEquipment: () => {
            return Equipment.getEquipmentByStatus(true)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        inactiveEquipment: () => {
            return Equipment.getEquipmentByStatus(false)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }, 

    Mutation: {
        createEquipment: (parent, {serial_number, warranty_end_date, active, lease_id, model_id, vendor_id} ) => {
            return Equipment.createEquipment(serial_number, warranty_end_date, active, lease_id, model_id, vendor_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateEquipment: (parent, {equipment_id, serial_number, warranty_end_date, active, lease_id, model_id, vendor_id} ) => {
            return Equipment.updateEquipment(equipment_id, serial_number, warranty_end_date, active, lease_id, model_id, vendor_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        deleteEquipment: (parent, { id }) => {
            return Equipment.deleteEquipment(id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        reactivateEquipment: (parent, { id }) => {
            return Equipment.updateEquipment(id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Equipment: {
        lease: ({lease_id}, args) => {
            return getLease(lease_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        model: ({model_id}, args) => {
            return getModel(model_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        vendor: ({vendor_id}, args) => {
            return getVendor(vendor_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)}) 
        }
    }
}


module.exports = resolvers