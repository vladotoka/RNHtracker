require('./models/User');
const keys = require('../.env/keys.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json()); 
app.use(authRoutes);

const mongoUri = `mongodb+srv://${keys.mongoDB}@cluster0.xtu0axj.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to mongoDB instance 🐱');
});

mongoose.connection.on('error', (err) => {
    console.log('🔌 Error.  Mongoose is trying to connect to the MongoDB and receives an error: ', err);
});

app.get('/', (req, res) => {
    res.send('Hi there!');
});

app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});