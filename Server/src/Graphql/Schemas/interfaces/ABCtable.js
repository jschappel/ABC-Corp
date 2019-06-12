const { gql} = require('apollo-server-express')

module.exports = gql`

interface ABCtable{
    id: ID!
    date_created: String!
    last_update: String!
}
`