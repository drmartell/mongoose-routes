require('dotenv').config();
require('./lib/utils/connect')();
require('./lib/app').listen('35813', () => console.log('Node listening on port 35813'));
