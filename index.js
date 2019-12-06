require('dotenv').config();
require('./lib/utils/connect')();
const chance = require('chance').Chance();
const Tweet = require('./lib/models/Tweet');

Tweet.create([...Array(10000)].map(() => ({
  handle: chance.twitter(),
  text: chance.sentence(),
  tags: [chance.animal(), chance.animal(), chance.name()]
})))
  .then(() => console.log('done'));


async function allCrudMethods() {
  // C - POST
  const createdTweet = await Tweet.create({
    handle: 'rover',
    text: 'I like bones',
    tags: ['breakfast']
  });

  // R - GET
  const aSingleFoundTweet = await Tweet.findById(createdTweet._id);
  const allFoundTweets = await Tweet.find();

  // U - PUT
  const updatedTweet = await Tweet.findByIdAndUpdate(aSingleFoundTweet._id,
    { text: 'I like tennis balls' },
    { new: true });

  // D - DELETE
  const deletedTweet = await Tweet.findByIdAndDelete(aSingleFoundTweet._id);
}


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
