import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const eventInfoSchema = new mongoose.Schema({
    name: String,
    date: Date,
    time: Timestamp,
})