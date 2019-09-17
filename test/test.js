const app = require('../routes/api/users');
const supertest = require('supertest');
const should = require('should');
const Blogpost = require('../models/Posts');

const server = supertest.agent('http://localhost:5000');

describe('Test user routes', () => {
  const newUser = {
    name: 'moy',
    username: 'newuser123',
    password: '123456',
    password2: '123456',
  };
  it('it should register a new user', done => {
    server
      .post('/api/users/register')
      .send(newUser)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });

  it('should try and fail to register user with unavailable username', done => {
    server
      .post('/api/users/register')
      .send(newUser)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.username.should.equal('Username already exists');
        done();
      });
  });

  it('should login user', done => {
    server
      .post('/api/users/login')
      .send({ username: 'mocah2', password: '123456' })
      .expect('content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        done();
      });
  });
});

describe('Test posts routes', () => {
  const user = {
    username: 'a_mac',
    password: '123456',
  };
  let token;
  before(done => {
    server
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        if (err) throw err;
        token = {
          Authorization: res.body.token,
        };
        done();
      });
  });

  it('GET /api/blogposts should fail for invalid credentials', done => {
    server.get('/api/blogposts/').expect(401, done);
  });

  it('GET /api/blogposts/ should return user posts as json', done => {
    server
      .get('/api/blogposts/')
      .set(token)
      .expect(200)
      .expect('Content-Type', /json/, done);
  });

  const newPost = new Blogpost({
    title: 'this is a new post title',
    text: 'this is the body',
    author: {
      username: user.username,
    },
  });

  it('POST /api/blogposts/ should create new blogpost', done => {
    server
      .post('/api/blogposts/')
      .set(token)
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});
