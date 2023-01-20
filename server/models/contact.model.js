import mongoose from "mongoose";
import contactSchema from "../schema/contact.schema.js"
const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact
