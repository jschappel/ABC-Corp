const jwt = require('jsonwebtoken')
const APP_SECRET = 'shhh-this-is-a-secret'

/**
 * tradeTokenForAccount: determines if the given web-token is associated with an account in the database
 * @param {JWT TOKEN} token a javascript web-token
 * @returns {Integer} the integer represents the id of the account in the database. Returns null
 * if the token provided was empty.
 */
function tradeTokenForAccount(token) {
    if(token !== ''){
        const newToken = token.replace('Bearer ', '')
        const { accountId } = jwt.verify(newToken, APP_SECRET)
        return accountId 
    } else{
        return null
    }
}



module.exports = {
    APP_SECRET,
    tradeTokenForAccount,
}