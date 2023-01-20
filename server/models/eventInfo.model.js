import mongoose from "mongoose";
import eventInfoSchema from "../schema/eventInfo.schema.js"
const EventInfo = mongoose.model('Event Info', eventInfoSchema)

export default EventInfo
