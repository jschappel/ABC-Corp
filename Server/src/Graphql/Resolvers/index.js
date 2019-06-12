/**
 * Combine all resolvers in this file
 */

 const countryResolvers = require('./country')
 const cityResolvers = require('./city')

 const combinedResolvers = [countryResolvers, cityResolvers]

 module.exports = combinedResolvers