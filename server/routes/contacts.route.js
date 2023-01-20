import express from "express"
const contactRouter = express.Router();

import Contact from "../models/contact.model.js";
// const Contact = require("../models/model.contacts.model")


contactRouter.route("/").get((req, res) => {
    Contact.find()
      .then(contactList => res.json(contactList))
      .catch(err => res.status(400).json('Error: ' + err));
  });

contactRouter.route("/addContact").post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthday = Date.parse(req.body.birthday);
    const phone = req.body.phone;
    const email = req.body.email;

    const newContact = new Contact (
        {
            firstName,
            lastName,
            birthday,
            phone,
            email
        }
    )

    newContact.save()
    .then(() => res.json('Contact added to database'))
    .catch(err => res.status(400).json('Error: ' + err));
});
  export default contactRouter