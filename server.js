const express = require('express')
const helmet = require('helmet')

const server = express()

server.use(helmet())
server.use(express.json())

const authRouter = require('./routers/auth-router')
server.use('/api/auth', authRouter)

module.exports = server