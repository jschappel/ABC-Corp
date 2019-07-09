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
 const officeResolvers = require('./office')
 const roomResolvers = require('./room')
 const employeeResolvers = require('./employee')
 const leaseResolvers = require('./lease')
 const equipmentResolvers = require('./equipment')
 const dateScalarResolvers = require('./Scalars/date')
 //const authPayloadResolvers = require('./authPayload')

 const combinedResolvers = [
     countryResolvers,
     cityResolvers,
     addressResolvers,
     vendorResolvers,
     categoryResolvers,
     modelResolvers,
     roleResolvers,
     accountResolvers,
     officeResolvers,
     roomResolvers,
     employeeResolvers,
     leaseResolvers,
     equipmentResolvers,
     dateScalarResolvers,
     //authPayloadResolvers,
    ]

 module.exports = combinedResolvers