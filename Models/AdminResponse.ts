
import mongoose = require('mongoose');

export interface IAdminResponse  extends mongoose.Document{
    AdminID: number,
    UserID: number,
    CarID: number,
    Cost: number,
    Note: string,
    by: string
}