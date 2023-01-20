import express from "express"
const contactRouter = express.Router();

import Contact from "../models/contact.model";


contactRouter.route("/").get((req, res) => {
    Contact.find()
      .then(contactList => res.json(contactList))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  export default contactRouter