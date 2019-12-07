require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
require('../lib/utils/connect')();

describe('application routes', () => {
  it('has a home route that displays a welcome message', () => 
    request(app).get('/')
      .then(res => expect(res.text).toEqual('Welcome to the cars database'))
  );

  it('has a home api route that returns all cars', () =>
    request(app).get('/api/cars')
      .then(res => {
        expect(res.body).toEqual({ text: 'hello' });
      })
  );

  it('has a route to get car by id', () => 
    request(app).get('/api/cars/:id')
      .then(res => {
        expect(res.body)
      })
  ); 

  it('has a /hello post route', () => 
    request(app)
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
      })
  );
});
