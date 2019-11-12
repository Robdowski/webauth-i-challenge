const express = require('express')
const helmet = require('helmet')
const session = require('express-session')
const cors = require('cors')
const KnexSessionStorage = require('connect-session-knex')(session)
const knexConnection = require('./data/dbconfig')

const server = express()

const sessionConfiguration = {
    name: 'sessionid',
    secret: process.env.COOKIE_SECRET || 'is it secret? is it safe?',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'development' ? false : true, 
        httpOnly: true, // prevent client javascript from accessing
    },
    resave: false, // save sessions even when they have not changed
    saveUninitialized: true,
    store: new KnexSessionStorage({
        knex: knexConnection,
        clearInterval: 1000 * 60 * 10, //delete expired sessions every 10 minutes
        tablename: 'user_sessions',
        sidfieldname: 'id',
        createtable: true,
    }),
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfiguration))

const authRouter = require('./routers/auth-router')
server.use('/api/auth', authRouter)

const userRouter = require('./routers/user-router')
server.use('/api/users', userRouter)

module.exports = server