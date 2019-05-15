const express = require('express')
const app = express()
const router = require('./routes/employee')

// Set the server port 
const port = process.env.PORT || 5000

// Add JSON parser to the app
app.use(express.json())

// Add middleware
app.use('/database', router)

app.listen(port, () => console.log(`Listening on port: ${port}!`))