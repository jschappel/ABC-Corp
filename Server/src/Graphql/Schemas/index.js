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

const combineSchema = [linkSchema, ABCinterface, countrySchema, citySchema, addressSchema, vendorSchema, categorySchema]
module.exports = combineSchema