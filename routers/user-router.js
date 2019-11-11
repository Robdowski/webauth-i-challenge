const router = require('express').Router();

const Users = require('../knexfunctions/users-model');
const requiresAuth = require('../middleware/requires-auth-middleware')

router.get('/', requiresAuth, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
