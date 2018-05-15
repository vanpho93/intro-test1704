const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mean1704', { useMongoClient: true })
.then(() => console.log('Database connected'))
.catch(error => console.log('Cannot connect database', error));
