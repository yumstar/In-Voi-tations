import mongoose from "mongoose";
import eventInfoSchema from "../schema/contact.schema"
export const EventInfo = mongoose.model('Contact', eventInfoSchema)
