"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var AdminResponseSchema = new mongoose.Schema({
    AdminID: {
        type: Number,
        required: true
    },
    UserID: {
        type: Number,
        required: true
    },
    CarID: {
        type: Number,
        required: true
    },
    Cost: {
        type: Number,
        required: true // Built-In validation
    },
    Note: {
        type: String,
        required: true // Built-In validation
    },
    by: {
        type: String,
        required: true
    }
});
exports.AdminResponse = mongoose.model('Response', AdminResponseSchema);
