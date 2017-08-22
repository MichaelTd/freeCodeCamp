// db connection string
const db = 'mongodb://localhost:27017/free-code-camp-voting'

// Port for server to listen to
const port = process.env.PORT || 6699

// Load things
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

// Load in env vars
dotenv.config({ varbose: true })

// Mongo connect

mongoose.connect(db, function)
