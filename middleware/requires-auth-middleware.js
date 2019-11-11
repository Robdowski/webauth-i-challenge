const Users = require('../knexfunctions/users-model')
const bcrypt = require('bcryptjs')

module.exports = (req, res, next) => {
    const { username, password } = req.headers

    if (username && password){
    Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        //check that the password is valid
        next()
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
} else {
    res.status(400).json({Error: "Please provide credentials"})
}

}