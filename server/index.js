const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(cors());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/user', require('./routes/user'));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});