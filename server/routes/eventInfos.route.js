import express  from "express";

import EventInfo from "../models/eventInfo.model.js";

const eventInfoRouter = express.Router();

eventInfoRouter.route("/").get((req, res) => {
    EventInfo.find()
      .then(eventInfoList => res.json(eventInfoList))
      .catch(err => res.status(400).json('Error: ' + err));
  });

eventInfoRouter.route("/addEventInfo").post((req, res) => {
    const name = req.body.name;
    const date = Date.parse(req.body.date);
    const time = Date.parse(req.body.time);

    const newEventInfo = new EventInfo (
        {
            name,
            date,
            time
        }
    )

    newEventInfo.save()
    .then(() => res.json('New event info added to database'))
    .catch(err => res.status(400).json('Error: ' + err));
});

  export default eventInfoRouter