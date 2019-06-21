'use strict'
console.log(`Starting server...`)

const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
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
https.createServer({
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.cert')
}, app).listen(3000, function() {
	console.log('puppr listening on port 3000! Go to https://localhost:3000/')
})
