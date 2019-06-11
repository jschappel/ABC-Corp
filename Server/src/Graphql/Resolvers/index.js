/**
 * Combine all resolvers in this file
 */

 const countryResolvers = require('./country')

 const combinedResolvers = [countryResolvers]

 module.exports = combinedResolvers