import mongoose from "mongoose";

export const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    birthday: Date,
    phone: String,
    email: String
})
