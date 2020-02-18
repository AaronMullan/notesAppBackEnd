const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          maxAge: 24 * 60 * 1000
        });
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .populate('notes')
      .then(user => {
        res.cookie('session', user.authToken(), {
          maxAge: 24 * 60 * 1000
        });
        res.send(user);
      })
      .catch(next);
  });

// .get('/', (req, res, next) => {
//   User
//     .find()
//     .then(users => res.send(users))
//     .catch(next);
// });
