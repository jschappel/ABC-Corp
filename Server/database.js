const mysql = require('mysql')

// Create a connection
const connection = mysql.createConnection({
    //Server properties
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'abc'
  })
 
  /**
   * Try to connect the the database. If we are able to connect then we log a message
   * If we are not able to then we will log the error
   */
  connection.connect((err) => {
    if(err) console.log(err)
    else console.log(`Connected to database on id: ${connection.threadId}`)
  })
  
  module.exports = connection