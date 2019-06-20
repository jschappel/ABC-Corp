const {UserInputError} = require('apollo-server-express')
const { getOffice } = require('../../SQL/office')
const Room = require('../../SQL/room')

const resolvers = {
    Query: {
        room: (parent, { id }) => {
           return Room.getRoom(id)
           .then( result => result)
           .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        rooms: () => {
           return Room.getRooms()
           .then( results => results)
           .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        activeRooms: () => {
            return Room.getRoomsByStatus(true)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        inactiveRooms: () => {
            return Room.getRoomsByStatus(false)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        floor: (parent, { floor }) => {
            return Room.getRoomsByFloor(floor)
            .then( results => results)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Mutation: {
        createRoom: (parent, { room_name, floor, active, office_id}) => {
            return Room.createRoom(room_name, floor, active, office_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        updateRoom: (parent, { id, room_name, floor, active, office_id }) => {
            return Room.updateRoom(id, room_name, floor, active, office_id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        deleteRoom: (parent, { id }) => {
            return Room.deleteRoom(id)
            .then( result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        },

        reactivateRoom: (parent, { id }) => {
           return Room.activateRoom(id)
           .then( result => result)
           .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    },

    Room: {
        office: (parent) => {
            return getOffice(parent.office_id)
            .then(result => result)
            .catch(error => {throw new UserInputError(error.sqlMessage)})
        }
    }
}

module.exports = resolvers