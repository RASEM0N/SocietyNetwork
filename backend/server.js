//#region Imports
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')

// Middleware
const morgan = require('morgan')

//#endregion

// Load env vars
dotenv.config({ path: './config/config.env' })

// Connect Database
connectDB()

const app = express()

//#region Routes
app.get('/', (req, res) => {
    res.send('API Running')
})

//#endregion

//#region Middleware
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//#endregion

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`.yellow.bold)
})
