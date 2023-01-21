import mongoose from "mongoose";
import Contact from "../models/contact.model.js";
import EventInfo from "../models/eventInfo.model.js";
const invitationListSchema = new mongoose.Schema({
    event: EventInfo,
    list: [Contact]
})