const { gql} = require('apollo-server-express')

module.exports = gql`
"""A lease is a contract from a vendor providing equipment to ABC Corp for a limited time """
    type Lease implements ABCtable{
        id: ID!
        date_created: String!
        last_update: String!
        lease_start: Date!
        lease_end: Date!
    }

    extend type Query{
        """Retrieves the lase associated with the given id"""
        lease(id: ID!): Lease!
        """Retrieves all leases that are in the database"""
        leases: [Lease!]!
        """Retrieves all active leases that are in the database"""
        activeLeases: [Lease!]!
        """Retrieves all inactive leases that are in the database"""
        inactiveLease: [Lease!]!
        
    }

    extend type Mutation{
        """Creates and adds a lease to the database"""
        createLease(lease_start: Date!, lease_end: Date!)): Boolean!
        """Updates the lease that is associated with the given id"""
        updateLease(id: ID!, lease_start: Date!, lease_end: Date!): Boolean!
    }
`