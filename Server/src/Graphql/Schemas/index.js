/**
 * Combine all Schemas in this file
 */
const { gql} = require('apollo-server-express')
const ABCinterface = require("./interfaces/ABCtable")
const countrySchema = require("./country")
const citySchema = require("./city")
const addressSchema = require("./address")
const vendorSchema = require('./vendor')
const categorySchema = require('./category')
const modelSchema = require('./model')
const roleSchema = require('./role')
const officeSchema = require('./office')
const accountSchema = require('./account')
const employeeSchema = require('./employee')
const roomSchema = require('./room')

const linkSchema = gql`
    type Query{
        _:Boolean
    }

    type Mutation{
        _:Boolean
    }

    type Subscription{
        _:Boolean
    }
`

const combineSchema = [
    linkSchema,
    ABCinterface,
    countrySchema,
    citySchema,
    addressSchema,
    vendorSchema,
    categorySchema,
    modelSchema,
    roleSchema,
    accountSchema,
    officeSchema,
    employeeSchema,
    roomSchema,
]
module.exports = combineSchema