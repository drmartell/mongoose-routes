require('dotenv').config();
//const request = require('supertest');
//const app = require('../lib/app');
const server = require('../server');
require('../lib/utils/connect').connect();
const disconnect = require('../lib/utils/connect').disconnect;

const testCar = {};

describe('application routes', () => {
  it('has a home GET route that displays a welcome message', async() => {
    const injectOptions = {
      method: 'GET',
      url: '/'
    };
    let res = await server.inject(injectOptions);
    res = await JSON.parse(res);
    expect(res.text).toEqual('Welcome to the cars database');
  });

  it.skip('has a POST route to add a car to the database', () => request(server)
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
    })
  );

  it.skip('has a GET route that returns all cars', () => request(server)
    .get('/api/cars')
    .then(res => expect(res.body).toEqual(expect.any(Array)))
  );

  it.skip('has a GET route that gets a car by id', () => request(server)
    .get(`/api/cars/${testCar._id}`)
    .then(res => expect(res.body).toEqual(expect.any(Object)))
  );

  it.skip('has a PUT route that updates a car by id', () => request(server)
    .put(`/api/put/${testCar._id}`)
    .send({
      make: 'FORD',
    })
    .then(res => expect(res.body._id).toEqual(testCar._id))
  );

  // it('has a DELETE route that deletes by id', () => request(app)
  //   .del(`/api/delete/${testCar._id}`)
  //   .then(res => expect(res.body._id).toEqual(testCar._id))
  // );
});

afterAll(() => {
  disconnect();
});
