/**
 * Combine all resolvers in this file
 */
 const countryResolvers = require('./country')
 const cityResolvers = require('./city')
 const addressResolvers = require('./address')

 const combinedResolvers = [countryResolvers, cityResolvers, addressResolvers]

 module.exports = combinedResolvers