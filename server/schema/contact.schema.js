import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: Date,
    phone: {type: String, required: true, minLength: 7, trim: true},
    email: {type: String, required: true, minLength: 3, trim: true}
})


export default contactSchema