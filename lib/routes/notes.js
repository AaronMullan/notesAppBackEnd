const { Router } = require('express');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', (req, res, next) => {
    Note
      .create(req.body)
      .then(note => res.send(note))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Note
      .findById(req.params.id)
      .then(note => res.send(note))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Note
      .find()
      .then(notes => res.send(notes))
      .catch(next);
  })
;
