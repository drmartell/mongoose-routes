//const express = require('express');
//const app = express();


//const Car = require('./models/Car');

//app.use(express.json());

//app.get('/', (req, res) => res.send('Welcome to the cars database'));
server.route({
  method: 'GET',
  path: '/',
  handler: (req, h) => {
    return 'Welcome to the cars database';
  }
});

app.get('/api/cars', async(req, res) => {
  const allCars = await Car.find();
  res.send(allCars);
});

app.get('/api/cars/:id', async(req, res) => {
  const targetCar = await Car.findById(req.params.id);
  res.send(targetCar);
});

app.post('/api/post', async(req, res) => {
  const { make, model, year } = req.body;
  const createdCar = await Car.create({
    make,
    model,
    year,
  });

  res.send(createdCar);
});

app.put('/api/put/:id', async(req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id);
  res.send(updatedCar);
});

app.delete('/api/delete/:id', (req, res) => {
  Car.findByIdAndDelete({ _id: req.params.id })
    .then(deleted => res.send(deleted));
});

module.exports = server;
