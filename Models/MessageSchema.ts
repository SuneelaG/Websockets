
import mongoose = require('mongoose');
// @ts-ignore
import {IMessage} from './Message'

const MessageSchema : mongoose.Schema<IMessage> = new mongoose.Schema<IMessage>({
    Source: {
        type: String,
        required: true,  // Built-In validation
    },

    Destination: {
        type: String,
        required: true  // Built-In validation
    },
    Message: {
        type: String,
        required: true  // Built-In validation
    }
})

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
