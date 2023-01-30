import express  from "express";
import dateFormat from "dateformat";
import sgMail from "@sendgrid/mail"
import InvitationList from "../models/invitationList.model.js";
import dotenv from "dotenv"
dotenv.config()

const invitationListRouter = express.Router();

invitationListRouter.route("/").get((req, res) => {
    InvitationList.find()
      .then(invitationListList => res.json(invitationListList))
      .catch(err => res.status(400).json('Error: ' + err));
  });

invitationListRouter.route("/addInvitationList").post((req, res) => {
    const event = req.body.event;
    const list = req.body.list;

    const newInvitationList = new InvitationList (
        {
          event,
          list
        }
    )

    newInvitationList.save()
    .then(() => res.json('New invitation list added to database'))
    .catch(err => res.status(400).json('Error: ' + err));
});

invitationListRouter.route('/invitationLists/:id').get((req, res) => {
    InvitationList.findById(req.params.id)
      .then(invitationList => res.json(invitationList))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  invitationListRouter.route('/invitationLists/:id').delete((req, res) => {
    InvitationList.findByIdAndDelete(req.params.id)
      .then(() => res.json(`Invitation List with id ${req.params.id} deleted`))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  invitationListRouter.route('/invitationLists/updateInvitationList/:id').post((req, res) => {
    InvitationList.findById(req.params.id)
      .then(invitationList => {
        invitationList.event = req.body.event;
        invitationList.list = req.body.list;
        invitationList.save()
          .then(() => res.json(`Invitation List with id ${req.params.id} updated`))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

invitationListRouter.route('/invitationLists/:id/inviteByEmail').post((req, res) => {
  InvitationList.findById(req.params.id)
  .then(invitationList => {
  const event = invitationList.event;
    const list = invitationList.list;
    var emailPersonalizations = []
    var emailsSentTo = []
    list.forEach((contact) => {
        emailPersonalizations.push({
            to: contact.email,
            text: `Hey ${contact.firstName}, ${process.env.USER} invites you to ${event.name} on ${dateFormat(event.date, "fullDate")}!` 
            })
        emailsSentTo.push(contact.email)
    })
    var retrievedEmails = []
    var missingEmails = []

    var emailsNotSentTo = []
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
    personalizations: emailPersonalizations,
    from: process.env.SENDGRID_VERIFIED_SENDER, // Change to your verified sender
    subject: process.env.USER + " invites you to " + event.name +  "!",
    text: `Hey, ${process.env.USER} invites you to ${event.name} on ${dateFormat(event.date, "fullDate")} at ${dateFormat(event.time, "shortTime")}`,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sgMail.send(msg)
    .then(() => {
        res.json(emailsSentTo)
    })
    .catch((error) => {
        res.status(400).json("Error:" + error)
    })
  })
  .catch((error) => {
    res.status(400).json("Error:" + error)
  })
})

  export default invitationListRouter