
import mongoose = require('mongoose');
import {IAdminResponse} from "./AdminResponse";

const AdminResponseSchema  : mongoose.Schema<IAdminResponse> = new mongoose.Schema<IAdminResponse>({
    AdminID:{
        type: Number,
        required: true
    },
    UserID:{
        type: Number,
        required: true
    },
    CarID:{
        type: Number,
        required: true
    },
    Cost:{
        type: Number,
        required: true  // Built-In validation
    },
    Note:{
        type: String,
        required: true  // Built-In validation
    },
    by:{
        type: String,
        required: true
    }
})

export const AdminResponse = mongoose.model<IAdminResponse>('Response', AdminResponseSchema);


