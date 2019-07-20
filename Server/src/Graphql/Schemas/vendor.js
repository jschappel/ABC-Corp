const { gql } = require('apollo-server-express')

module.exports = gql`
    """A vendor is a business that ABC Corp has bought/leased items from"""
    type Vendor implements ABCtable {
        id: ID!
        date_created: Date!
        last_update: Date!
        name: String!
        phone_number: String!
        email: String!
        address: Address!
        leases: [Lease!]!
    }

    extend type Query {
        """Retrieves the vendor associated with the given id"""
        vendor(id: ID!): Vendor!
        """Retrieves all vendors that are in the database"""
        vendors: [Vendor!]
    }

    extend type Mutation {
        """Creates and adds a vendor the the database"""
        createVendor(name: String!, phone_number: String!, email: String!, address_id: ID!): Boolean!
        """Updates the vender that is associated with the given id"""
        updateVendor(id: ID!, name: String!, phone_number: String!, email: String!, address_id: ID!): Boolean!
    }
`