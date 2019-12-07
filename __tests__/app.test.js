require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
require('../lib/utils/connect')();

const testCar = {};

describe('application routes', () => {
  it('has a home GET route that displays a welcome message', () => 
    request(app).get('/')
      .then(res => expect(res.text).toEqual('Welcome to the cars database'))
  );

  it('has a POST route to add a car to the database', () => 
    request(app).post('/api/post')
      .send({
        make: 'Ford',
        model: 'Fiesta',
        year: 2021
      })
      .then(res => { expect(res.body).toEqual(expect.objectContaining({
        make: 'Ford',
        model: 'Fiesta',
        year: 2021
      }));
      // get the id for additional testing below
      testCar._id = res.body._id;
      })
  );

  it('has an GET route that returns all cars', () =>
    request(app).get('/api/cars')
      .then(res => expect(res.body).toEqual(expect.any(Array)))
  );

  it('has a GET route to get car by id', () => 
    request(app).get(`/api/cars/${testCar._id}`)
      .then(res => expect(res.body).toEqual(expect.any(Object)))
  );

  it('has a PUT route to update a car by id', () =>
    request(app).get(`/api/put/${testCar._id}`)
      .then(res => expect(res.body._id).toEqual(testCar._id))
  );
});
