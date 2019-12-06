require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
require('../lib/utils/connect')();

describe('application routes', () => {
  it('has a home route that says hello everyone', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ text: 'hello' });
      });
  });

  it('has a /hello post route', () => {
    return request(app)
      .post('/hello')
      .send({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        });
      });
  });
});
