const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    entryNo: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true
    },
    roomNo: {
        type: String,
        required: true
    },
    hostelName: {
        type: String,
        required: true
    }, 
    password:{
        type: String
    },
    isin:{
        type: Boolean,
        default: true
    },
    avatar: {
        type: String,
        required: true
      },
})

module.exports = Book = mongoose.model('user', UserSchema);