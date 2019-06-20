const { gql } = require('apollo-server-express')

module.exports = gql`
    """A piece of equipment is an item owner or leased by ABC Corp"""
    type Equipment implements ABCtable {
        id: ID!
        date_created: String!
        last_update: String!
        serial_number: String!
        active: Boolean!
        warranty_end_date: Date
        lease: Lease
        model: Model!
        vendor: Vendor!
    }

    extend type Query {
        """Retrieves a piece of equipment associated with the given id"""
        equipmentSingle(id: ID!): Equipment!
        """Retrieves all equipment (active and inactive) that are in the database"""
        equipmentAll: [Equipment!]!
        """Retrieves all active equipment that is in the database"""
        activeEquipment: [Equipment!]!
        """Retrieves all inactive equipment that is in the database"""
        inactiveEquipment: [Equipment!]!
    }

    extend type Mutation {
        """Creates and adds a piece of equipment to the database"""
        createEquipment(serial_number: String!, warranty_end_date: Date, active: Boolean!, lease_id: ID, model_id: ID!, vendor_id: ID!): Boolean!
        """Updates a piece of equipment that is associated with the given id"""
        updateEquipment(equipment_id: ID!, serial_number: String!, warranty_end_date: Date, active: Boolean!, lease_id: ID, model_id: ID!, vendor_id: ID!): Boolean!
        """Soft deletes a piece of equipment from the database"""
        deleteEquipment(id: ID!): Boolean!
        """Reactivates a piece of equipment in the database"""
        reactivateEquipment(id: ID!): Boolean!
    }
`