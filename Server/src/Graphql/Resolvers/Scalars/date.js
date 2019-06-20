const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date scalar type',
        serialize,
        parseValue,
        parseLiteral
    })
}

/**
 * parseValue: parses a value to a date object when a client sends data to the server. 
 * @param {String} value A string to be parsed to a Date object
 */
function parseValue(value) {
    return returnOnError(() => value == null ? null : new Date(value), null)
}

/**
 * parseLiteral: called when an inline input parameter should be parsed. Rather than returning a value,
 * it will return an AST (abstract syntax tree) node.
 * @param {Abstract Syntax Tree} ast an abstract syntax tree node.
 */
function parseLiteral(ast) {
    return ast.kind === Kind.STRING ? parseValue(ast.value) : null
}

/**
 * serialize: Called when a value needs to be passed to the client. This function takes a Date and parses
 * it to a JSON object.
 * @param {Date} value A javascript Date object 
 */
function serialize(value) {
    return value instanceof Date ? value.toISOString() : null
}

/**
 * returnOnError: Helper function for parsing an incoming date string from the client
 * @param {*} operation 
 * @param {*} alternative 
 */
const returnOnError = (operation, alternative) => {
    try {
      return operation();
    } catch (e) {
      return alternative;
    }
}

module.exports = resolvers