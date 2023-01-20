import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const eventInfoSchema = new mongoose.Schema({
    name: {type: String, required: true, minLength: 2, trim: true},
    date: {type: Date, required: true},
    time: {type: Date, required: true}
})

export default eventInfoSchema