const app = require('../routes/api/users');
const supertest = require('supertest');
const should = require('should');


const server = supertest.agent('http://localhost:5000');

describe('Test user routes', () => {
  const newUser = {
    name: 'moy',
    username: 'mocah24',
    password: '123456',
    password2: '123456'
  }
  it('it should register a new user', (done) => {
    server
      .post('/api/users/register')
      .send(newUser)
      .expect('Content-type', /json/)
      .expect(200)
      .end((err,res) => {
        res.status.should.equal(200);
        done();
      })
  });

  it('should try and fail to register user with unavailable username', (done) => {
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
  })

  it('should login user', (done) => {
    server
      .post('/api/users/login')
      .send({username: 'mocah2', password: '123456'})
      .expect('content-type', /json/)
      .expect(200)
      .end((err,res) => {
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        done();
      })
  })
});