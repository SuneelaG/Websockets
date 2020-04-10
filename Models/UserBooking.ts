
import mongoose = require('mongoose');

export interface IUserBooking  extends mongoose.Document{
    CarName: string,
    Duration: number,
    CarID: number,
    UserID: number,
    by: string
}