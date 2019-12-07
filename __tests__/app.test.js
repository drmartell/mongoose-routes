require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
require('../lib/utils/connect')();

const testCar = {};

describe('application routes', () => {
  it('has a home GET route that displays a welcome message', done => request(app)
    .get('/')
    .then(res => { expect(res.text).toEqual('Welcome to the cars database'); done(); })
  );
  
  it('has a POST route to add a car to the database', done => request(app)
    .post('/api/post')
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
    // store the id for additional testing below
    testCar._id = res.body._id;
    done();
    })
  );

  it('has a GET route that returns all cars', done => request(app)
    .get('/api/cars')
    .then(res => { expect(res.body).toEqual(expect.any(Array)); done(); })
  );

  it('has a GET route that gets a car by id', done => request(app)
    .get(`/api/cars/${testCar._id}`)
    .then(res => { expect(res.body).toEqual(expect.any(Object)); done(); })
  );

  it('has a PUT route that updates a car by id', done => request(app)
    .put(`/api/put/${testCar._id}`)
    .send({
      make: 'FORD',
    })
    .then(res => { expect(res.body._id).toEqual(testCar._id); done(); })
  );

  it('has a DELETE route that deletes by id', done => request(app)
    .del(`/api/delete/${testCar._id}`)
    .then(res => { expect(res.body._id).toEqual(testCar._id); done(); })
  );
});
