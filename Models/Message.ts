
import mongoose = require('mongoose');

export interface IMessage extends mongoose.Document{
    Source: string,
    Destination: string,
    Message: string
}