
import mongoose = require('mongoose');
import {IUserBooking} from "./UserBooking";

const UserBookingSchema  : mongoose.Schema<IUserBooking> = new mongoose.Schema<IUserBooking>({
    CarName: {
        type: String,
        required: true,  // Built-In validation
    },
    Duration:{
        type: Number,
        required: true  // Built-In validation
    },
    UserID:{
        type: Number,
        required: true
    },
    CarID:{
        type: Number,
        required: true
    },
    by:{
        type: String,
        required: true
    }
})

export const UserBooking = mongoose.model<IUserBooking>('Request', UserBookingSchema);


