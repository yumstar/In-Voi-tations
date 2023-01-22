import express  from "express";

import InvitationList from "../models/invitationList.model.js";

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

  invitationListRouter.route('/invitationLists/update/:id').post((req, res) => {
    InvitationList.findById(req.params.id)
      .then(invitationList => {
        invitationList.name = req.body.name;
        invitationList.date = Date.parse(req.body.date);
        invitationList.time = Date.parse(req.body.time);
        invitationList.save()
          .then(() => res.json(`Invitation List with id ${req.params.id} updated`))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  export default invitationListRouter