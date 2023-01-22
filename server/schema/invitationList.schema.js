import mongoose from "mongoose";
import contactSchema from "./contact.schema.js";
import eventInfoSchema from "./eventInfo.schema.js";
const invitationListSchema = new mongoose.Schema({
    event: eventInfoSchema,
    list: [contactSchema]
})

export default invitationListSchema