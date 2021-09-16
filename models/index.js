const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;

const configOptions = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
};

mongoose.connect(connectionString, configOptions)
    .then(() => console.log("MongoDB successfully connected..."))
    .catch((error) => console.log(`MongoDB connection error: ${error}`));

module.exports = {
    User: require('./User'),
    Team: require('./Team'),
};