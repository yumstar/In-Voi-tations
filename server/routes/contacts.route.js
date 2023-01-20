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

contactRouter.route('/contacts/:id').get((req, res) => {
    Contact.findById(req.params.id)
      .then(contact => res.json(contact))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  contactRouter.route('/contacts/:id').delete((req, res) => {
    Contact.findByIdAndDelete(req.params.id)
      .then(() => res.json(`Contact with id ${req.params.id} deleted`))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  contactRouter.route('/contacts/update/:id').post((req, res) => {
    Contact.findById(req.params.id)
      .then(contact => {
        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;
        contact.birthday = Date.parse(req.body.birthday);
        contact.phone = req.body.phone;
        contact.email = req.body.email;
        contact.save()
          .then(() => res.json(`Contact with id id ${req.params.id} updated`))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  export default contactRouter