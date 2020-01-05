require('dotenv').config();
const server = require('../server');
const connect = require('../lib/utils/connect').connect;
const disconnect = require('../lib/utils/connect').disconnect;

const testCar = {};

// Start application before running the test case
beforeAll(async(done) => {
  await connect();
  server.events.on('start', () => {
    done();
  });
});

// Stop application after running the test case
afterAll(async(done) => {
  await disconnect();
  server.events.on('stop', () => {
    done();
  });
  server.stop();
});

describe('application routes', () => {
  it('has a home GET route that displays a welcome message', async() => {
    const injectOptions = {
      method: 'GET',
      url: '/'
    };
    const data = await server.inject(injectOptions);
    expect(data.statusCode).toBe(200);
    expect(data.result).toBe('Welcome to the cars database');
  });

  it('has a POST route to add a car to the database', async() => {
    const injectOptions = {
      method: 'POST',
      url: '/api/post',
      payload: JSON.stringify({
        make: 'Ford',
        model: 'Fiesta',
        year: 2021
      })
    };
    const data = await server.inject(injectOptions);
    expect(data.statusCode).toBe(200);
    const payload = await JSON.parse(data.payload);
    expect(payload).toEqual(expect.objectContaining({
      make: 'Ford',
      model: 'Fiesta',
      year: 2021
    }));

    // store the id for additional testing below
    testCar._id = payload._id;
  });

  it('has a GET route that returns all cars', async() => {
    const injectOptions = {
      method: 'GET',
      url: '/api/cars'
    };
    const data = await server.inject(injectOptions);
    expect(data.statusCode).toBe(200);
    const payload = await JSON.parse(data.payload);
    expect(payload).toEqual(expect.any(Array));
  });

  it('has a GET route that gets a car by id', async() => {
    const injectOptions = {
      method: 'GET',
      url: `/api/cars/${testCar._id}`
    };
    const data = await server.inject(injectOptions);
    expect(data.statusCode).toBe(200);
    const payload = await JSON.parse(data.payload);
    expect(payload).toEqual(expect.any(Object));
  });

  it('has a PATCH route that updates a car by id', async() => {
    const injectOptions = {
      method: 'PATCH',
      url: `/api/patch/${testCar._id}`,
      payload: JSON.stringify({ make: 'FORD' })
    };
    const data = await server.inject(injectOptions);
    expect(data.statusCode).toBe(200);
    const payload = await JSON.parse(data.payload);
    expect(payload.make).toEqual('FORD');
  });

  it('has a DELETE route that deletes by id', async() => {
    const injectOptions = {
      method: 'DELETE',
      url: `/api/delete/${testCar._id}`,
      payload: JSON.stringify({ make: 'FORD' })
    };
    const data = await server.inject(injectOptions);
    expect(data.statusCode).toBe(200);
    const payload = await JSON.parse(data.payload);
    expect(payload.id).toEqual(testCar.id);
  });
});
