const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const mariadb = require('mariadb')

const app = express()

const PORT = 41995

app.use(cors())
app.use(express.json())
app.use(fileupload())

module.exports = app

var upload = require('./upload');
var voting = require('./voting');
var ranking = require('./ranking');

//run server
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
