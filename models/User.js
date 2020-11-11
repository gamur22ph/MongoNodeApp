const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const uuid = require('uuid');

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        default: () => {return uuid.v4()}
    },
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('user', UserSchema);