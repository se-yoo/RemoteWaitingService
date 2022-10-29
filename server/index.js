const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const config = require("./config/key");

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));
// support parsing of application/json type post data
app.use(bodyParser.json());

app.use('/api/user', require('./routes/user'));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});