const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('../knexfunctions/users-model');

router.post('/register', (req, res) => {
  let userInformation = req.body;

  const hash = bcrypt.hashSync(userInformation.password, 12);
  userInformation.password = hash

  Users.add(userInformation)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        //check that the password is valid
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
