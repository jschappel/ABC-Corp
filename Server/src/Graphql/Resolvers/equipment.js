const {UserInputError} = require('apollo-server-express')


const resolvers = {
    Query: {
        equipmentSingle: (parent, { id }) => {

        },

        equipmentAll: () => {

        },

        activeEquipment: () => {
                        
        },

        inactiveEquipment: () => {

        }
    }, 

    Mutation: {
        createEquipment: (parent, {} ) => {
            
        },

        updateEquipment: (parent, {} ) => {
           
        },

        deleteEquipment: (parent, { id }) => {
            
        },

        reactivateEquipment: (parent, { id }) => {
            
        }
    },

    Equipment: {
        lease: (parent, args) => {

        },

        model: (parent, args) => {

        },

        vendor: (parent, args) => {

        }
    }
}


module.exports = resolvers