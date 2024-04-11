const express = require('express')
const app = express()

app.get('/', async (req, res) => {
    res.status(200).send('Bootcamp backend')
})

module.exports = app