require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Note = require('../lib/models/Note');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let note;
  beforeEach(async() => {
    note = await Note.create({
      title: 'bulk test title',
      text: 'bulk test text'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new note', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({
        title: 'test title',
        text: 'test text'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'test title',
          text: 'test text',
          __v: 0
        });
      });
  });
  it('gets a nte by id', () => {
    return request(app)
      .get(`/api/v1/notes/${note.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'bulk test title',
          text: 'bulk test text',
          __v: 0
        });
      });
  });
  it('gets all notes', () => {
    return request(app)
      .get('/api/v1/notes')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: expect.any(String),
            title: 'bulk test title',
            text: 'bulk test text',
            __v: 0
          }
        ]);
      });
  });
  it('updates a note', () => {
    return request(app)
      .patch(`/api/v1/notes/${note.id}`)
      .send({ title: 'Updated Note Title Via Patch Route' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Updated Note Title Via Patch Route',
          text: 'bulk test text',
          __v: 0
        });
      });
  });
});
 
