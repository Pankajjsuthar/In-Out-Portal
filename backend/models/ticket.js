const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
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
    place: {
        type: String
    },
    entryType:{
        type: String,
        default: 'out'
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type:String,
        required: true
    },
    status:{
        type: String,
        default: 'pending'
    }
})

module.exports = Ticket = mongoose.model('ticket', TicketSchema);