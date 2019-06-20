'use strict'
console.log(`Starting server...`)

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')({ origin: true })
console.log(`Loaded dependencies...`)

// configure express
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors)
console.log(`Configured Express...`)

// configure routes
require('./routes')(app)
console.log(`Loaded routes...`)

// eslint-disable-next-line
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}...`)
})
