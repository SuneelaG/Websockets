"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var UserBookingSchema = new mongoose.Schema({
    CarName: {
        type: String,
        required: true
    },
    Duration: {
        type: Number,
        required: true // Built-In validation
    },
    UserID: {
        type: Number,
        required: true
    },
    CarID: {
        type: Number,
        required: true
    },
    by: {
        type: String,
        required: true
    }
});
exports.UserBooking = mongoose.model('Request', UserBookingSchema);
