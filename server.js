require('dotenv').config();
require('./lib/utils/connect').connect();
const Hapi = require('hapi');
// const server = require('./lib/app');
//require('./lib/app').listen('35813', () => console.log('Node listening on port 35813'));
const Car = require('./lib/models/Car');

const server = Hapi.server({
  port: 3333,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: () => {
    return 'Welcome to the cars database';
  }
});

server.route({
  method: 'GET',
  path: '/api/cars',
  handler: async() => {
    const allCars = await Car.find();
    return allCars;
  }
});

server.route({
  method: 'GET',
  path: '/api/cars/{id}',
  handler: async req => {
    //return req.params.id;
    const targetCar = await Car.findById(req.params.id);
    return targetCar;
  }
});

server.route({
  method: 'POST',
  path: '/api/post',
  handler: async req => {
    const { make, model, year } = req.payload;
    const createdCar = await Car.create({
      make,
      model,
      year,
    });
    return createdCar;
  }
});

server.route({
  method: 'PATCH',
  path: '/api/patch/{id}',
  handler: async req => {
    const updatedCar = await Car.findByIdAndUpdate({ _id: req.params.id }, req.payload, { new: true });
    return updatedCar;
  }
});

server.route({
  method: 'DELETE',
  path: '/api/delete/{id}',
  handler: async req => {
    const deletedCar = await Car.findByIdAndDelete({ _id: req.params.id });
    return deletedCar;
  }
});

const init = async() => {
  await server.start();
  console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

module.exports = server;
