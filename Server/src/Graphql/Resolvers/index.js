/**
 * Combine all resolvers in this file
 */
 const countryResolvers = require('./country')
 const cityResolvers = require('./city')
 const addressResolvers = require('./address')
 const vendorResolvers = require('./vendor')
 const categoryResolvers = require('./category')
 const modelResolvers = require('./model')

 const combinedResolvers = [countryResolvers, cityResolvers, addressResolvers, vendorResolvers, categoryResolvers, modelResolvers]

 module.exports = combinedResolvers