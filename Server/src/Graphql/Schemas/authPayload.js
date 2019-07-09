const { gql } = require('apollo-server-express')

module.exports = gql`
    """Bundles a token and account to be used for authorization"""
    type AuthPayload {
        token: String
        account: Account
    }
`