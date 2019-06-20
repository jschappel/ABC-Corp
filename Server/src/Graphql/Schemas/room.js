const { gql } = require('apollo-server-express')

module.exports = gql`
    """A Room represents a room inside an ABC Corp office"""
    type Room implements ABCtable {
        id: ID!
        date_created: String!
        last_update: String!
        room: String!
        floor: Int!
        active: Boolean!
        office: Office!
    }

    extend type Query {
        """Retrieves the room associated with the given id"""
        room(id: ID!): Room
        """Retrieves all rooms (active and inactive) that are in the database"""
        rooms: [Room!]!
        """Retrieves all active rooms that are in the database"""
        activeRooms: [Room!]!
        """Retrieves all inactive rooms that are in the database"""
        inactiveRooms: [Room!]!
        """Retrieves all rooms on the given floor"""
        floor(floor: Int!): [Room!]!
    }

    extend type Mutation {
        """Creates and adds a room the database"""
        createRoom(room_name: String!, floor: Int!, active: Boolean!, office_id: ID!): Boolean!
        """Updates the room that is associated with the given id"""
        updateRoom(id: ID!, room_name: String!, floor: Int!, active: Boolean!, office_id: ID!): Boolean!
        """Soft deletes a room from the database"""
        deleteRoom(id: ID!): Boolean!
        """Reactivates a room in the database"""
        reactivateRoom(id: ID!): Boolean!
    }
`