const { gql } = require('apollo-server-express')

module.exports = gql`
    """A employee is someone who works for ABC Corp"""

    type Employee implements ABCtable {
        id: ID!
        date_created: String!
        last_update: String!
        first_name: String!
        last_name: String!
        phone_number: String!,
        work_phone_number: String!
        email: String!
        active: Boolean!
        address: Address!
        office: Office!
        account: Account!

    }

    extend type Query {
        """Retrieves the employee associated with the given id"""
        employee(id: ID!): Employee
        """Retrieves all employees (active and inactive) that are in the database"""
        employees: [Employee!]!
        """Retrieves all active employees that are in the database"""
        activeEmployees: [Employee!]!
        """Retrieves all inactive employees that are in the database"""
        inactiveEmployees: [Employee!]!
    }

    extend type Mutation {
        """Creates and adds a employee the the database"""
        createEmployee(first_name: String!, last_name: String!, phone_number: ID!, work_phone_number: String!, email: String!, status: Boolean!, address_id: ID!, office_id: ID!, account_id: ID!): Boolean!
        """Updates the employee that is associated with the given id"""
        updateEmployee(id: ID!, first_name: String!, last_name: String!, phone_number: ID!, work_phone_number: String!, email: String!, status: Boolean!, address_id: ID!, office_id: ID!, account_id: ID!): Boolean!
        """Soft deletes an employee from the database"""
        deleteEmployee(id: ID!): Boolean!
        """Reactivates an employee in the database"""
        reactivateEmployee(id: ID!): Boolean!
    }
`