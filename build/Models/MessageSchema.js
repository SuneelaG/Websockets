"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var MessageSchema = new mongoose.Schema({
    Source: {
        type: String,
        required: true,
    },
    Destination: {
        type: String,
        required: true // Built-In validation
    },
    Message: {
        type: String,
        required: true // Built-In validation
    }
});
exports.Message = mongoose.model('Message', MessageSchema);
