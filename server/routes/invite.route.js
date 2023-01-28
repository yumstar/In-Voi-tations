import dotenv from "dotenv"
dotenv.config()
import sgMail from "@sendgrid/mail"
import express  from "express";
import dateFormat from "dateformat";
const inviteRouter = express.Router();


inviteRouter.route("/inviteByEmail").post((req, res) => {
    const event = req.body.event;
    const list = req.body.list;
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

    // // try {
    //     list.forEach(async (contact) => {
    //         // console.log(contact)
    //         contact.email?  retrievedEmails.push(contact.email): missingEmails.push(contact._id)
    //         if(contact.email) {
    //             const msg = {
    //                 to: contact.email, // Change to your recipient
    //                 from: process.env.SENDGRID_VERIFIED_SENDER, // Change to your verified sender
    //                 subject: process.env.USER + " invites you to " + event.name +  "!",
    //                 text: 'on ' + dateFormat(event.date, "fullDate"),
    //                 // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    //               }
    //               try{
    //                 await sgMail.send(msg);
    //             //   .then((response) => {
    //                 console.log(response[0].statusCode)
    //                 console.log(response[0].headers)
    //                 emailsSentTo.push(contact._id)
    //                 console.log(emailsSentTo)
    //             // console.log(emailsSentTo)})
    //               } catch (error) {
    //                 emailsNotSentTo.push({id: contact._id, errorMsg: error})
    //               }
    //             //   .catch((error) => {emailsNotSentTo.push({id: contact._id, errorMsg: error})});
    //         }

    //     })
    //     console.log(emailsSentTo)
    //     const outcome = {succeeded: emailsSentTo, failed: emailsNotSentTo, missing: missingEmails}

    //     res.json(outcome)
    //     // console.log(emailsSentTo)


    //     // console.log(emailsSentTo)

    // // }
    // // catch (error) {
    // //     res.status(400).json("Error:" + error)
    // // }

   
    // // .then(() => res.json(list))
    // // .catch(error => res.status(400).json("Error:" + error))
})

export default inviteRouter
