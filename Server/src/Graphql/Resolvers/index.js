/**
 * Combine all resolvers in this file
 */
 const countryResolvers = require('./country')
 const cityResolvers = require('./city')
 const addressResolvers = require('./address')
 const vendorResolvers = require('./vendor')
 const categoryResolvers = require('./category')
 const modelResolvers = require('./model')
 const roleResolvers = require('./role')
 const accountResolvers = require('./account')

 const combinedResolvers = [countryResolvers, cityResolvers, addressResolvers, vendorResolvers, categoryResolvers, modelResolvers, roleResolvers, accountResolvers]

 module.exports = combinedResolvers