import express from "express"
const contactRouter = express.Router();
import axios from "axios"
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
    axios.get('https://emailvalidation.abstractapi.com/v1/?api_key=' + process.env.ABSTRACT_API_KEY + '&email=' + email)
    .then((response) => {
      console.log(response)
      if(response.data.deliverability == "DELIVERABLE"){
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
      }
      else {
        throw new Error("Unable to verify email: " + email)
      }
    })
    .catch(error => {
      res.status(400).json({errorMsg : error})
    })
    // const newContact = new Contact (
    //     {
    //         firstName,
    //         lastName,
    //         birthday,
    //         phone,
    //         email
    //     }
    // )

    // newContact.save()
    // .then(() => res.json('Contact added to database'))
    // .catch(err => res.status(400).json('Error: ' + err));
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
          .then(() => res.json(`Contact with id ${req.params.id} updated`))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  export default contactRouter