const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('../config.js');

dotenv.config();

/* MongoDB Connection */
// mongoose.connect(config.db.host, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(console.log("Connected to MongoDB..."))
//   .catch((err) => console.log(err));

mongoose.connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log('MongoDB connection successed.'))
  .catch((err) => console.log('Error in MongoDB connection: '+JSON.stringify(err, undefined, 2)));
