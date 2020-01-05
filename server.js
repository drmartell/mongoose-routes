require('dotenv').config();
require('./lib/utils/connect').connect();
const Car = require('./lib/models/Car');
//require('./lib/app').listen('35813', () => console.log('Node listening on port 35813'));

const Hapi = require('hapi');

const hserver = new Hapi.server({
  port: 35813,
  host: 'localhost'
});

// const server = require('app');
//app.get('/', (req, res) => res.send('Welcome to the cars database'));
hserver.route({
  method: 'GET',
  path: '/',
  handler: async(req, h) => {
    return 'Welcome to the cars database';
  }
});

hserver.route({
  method: 'GET',
  path: '/api/cars',
  handler: async(req, h) => {
    const allCars = await Car.find();
    return allCars;
  }
});

hserver.route({
  method: 'GET',
  path: '/api/cars/:id',
  handler: async(req, h) => {
    const targetCar = await Car.findById(req.params.id);
    return targetCar;
  }
});

hserver.route({
  method: 'POST',
  path: '/api/post',
  handler: async(req, h) => {
    const { make, model, year } = req.body;
    const createdCar = await Car.create({
      make,
      model,
      year,
    });
    return createdCar;
  }
});

hserver.route({
  method: 'PUT',
  path: '/api/put/:id',
  handler: async(req, h) => {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id);
    return updatedCar;
  }
});

hserver.route({
  method: 'DELETE',
  path: '/api/delete/:id',
  handler: async(req, h) => {
    const deletedCar = await Car.findByIdAndDelete({ _id: req.params.id });
    return deletedCar;
  }
});

(async() => {
  await hserver.start();
  console.log('Server running at:', hserver.info.uri);
})();

module.export = hserver;
