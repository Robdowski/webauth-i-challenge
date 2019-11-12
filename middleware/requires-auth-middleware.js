const Users = require('../knexfunctions/users-model')
const bcrypt = require('bcryptjs')

module.exports = (req, res, next) => {
  if (req.session && req.session.username){
    next()
  } else {
    res.status(401).json({message: "You are not logged in."})
  }
}