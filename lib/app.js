const express = require('express');
const app = express();

const Car = require('./models/Car');

app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to the cars database'));

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
    .then(res.send);
});

module.exports = app;


// async function allCrudMethods() {
//   // C - POST
//   const createdTweet = await Tweet.create({
//     handle: 'rover',
//     text: 'I like bones',
//     tags: ['breakfast']
//   });

//   // R - GET
//   const aSingleFoundTweet = await Tweet.findById(createdTweet._id);
//   const allFoundTweets = await Tweet.find();

//   // U - PUT
//   const updatedTweet = await Tweet.findByIdAndUpdate(aSingleFoundTweet._id,
//     { text: 'I like tennis balls' },
//     { new: true });

//   // D - DELETE
//   const deletedTweet = await Tweet.findByIdAndDelete(aSingleFoundTweet._id);
// }


// Tweet
//   .create({
//     handle: 'spot',
//     text: '5',
//     tags: ['weight', '20 lbs']
//   })
//   .then(createdTweet => {
//     return Tweet.findById(createdTweet._id);
//   })
//   .then(foundTweet => {
//     console.log(foundTweet);
//     return Tweet.find();
//   })
//   .then(allTweets => {
//     console.log(allTweets);
//     return Tweet.findByIdAndUpdate(allTweets[0]._id, { text: 'this is a better tweet' }, { new: true });
//   })
//   .then(updatedTweet => {
//     console.log(updatedTweet);
//     return Tweet.findByIdAndDelete(updatedTweet._id);
//   })
//   .then(deletedTweet => {
//     console.log(deletedTweet);
//   });
