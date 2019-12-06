const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose server connected');
  });

  mongoose.connection.on('error', () => {
    console.error('Mongoose server connection failure - is server running?\nbrew services start mongodb-community');
  });
}

module.exports = connect;
