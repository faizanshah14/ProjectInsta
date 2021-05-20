const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const { mongorui } = require('./keys');
require('./models/user');

mongoose.connect(mongorui, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('connection connected');
});

mongoose.connection.on('error', (err) => {
    console.log('error connect', err);
});
//6loIEVqzt74AUfsx
require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(port, () => {
    console.log('running on port', port);
});