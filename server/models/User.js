const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        trim: true,
        unique: 1 
    },
    password: {
        type: String,
        minlength: 10
    },
    name: {
        type: String,
        maxlength: 50
    },
    birthDay: {
        type: Date
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    role : {
        type: Number,
        default: 0 
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User }