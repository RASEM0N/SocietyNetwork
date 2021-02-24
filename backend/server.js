/* Import */
const express = require('express')
const colors = require('colors')
const app = express()

const PORT = process.env.PORT || 500

app.get('/', (req, res) => {
    res.send('API Running')
})

app.listen(PORT, () => {
    console.log(`------------------------------------------`)
    console.log(`Server started on port ${PORT}`.yellow.bold)
})
