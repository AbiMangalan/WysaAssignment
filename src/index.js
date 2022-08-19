const express = require('express');
const app = express();
const router = require('./routes/router');
const { connect } = require('mongoose');

connect('mongodb+srv://WysaAssignment:vAinhiKJ9IY9KKaf@cluster0.w5bka.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(3000, () => console.log('Express App running on port 3000'));