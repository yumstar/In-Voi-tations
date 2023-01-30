import express  from "express";

import EventInfo from "../models/eventInfo.model.js";

const eventInfoRouter = express.Router();

eventInfoRouter.route("/").get((req, res) => {
    EventInfo.find()
      .then(eventInfoList => res.json(eventInfoList))
      .catch(err => res.status(400).json('Error: ' + err));
  });

eventInfoRouter.route("/addEventInfo").post((req, res) => {
    let location
    const name = req.body.name;
    const date = Date.parse(req.body.date);
    const time = Date.parse(req.body.time);
    if(req.body.location) {
      location = req.body.location
    }
   
    if(req.body.location) {
      var newEventInfo = new EventInfo (
        {
            name,
            date,
            time,
            location
        }
    )
    }
    else {
      var newEventInfo = new EventInfo (
        {
            name,
            date,
            time,
        }
    )
    }


    newEventInfo.save()
    .then(() => res.json('New event info added to database'))
    .catch(err => res.status(400).json('Error: ' + err));
});

eventInfoRouter.route('/eventInfos/:id').get((req, res) => {
    EventInfo.findById(req.params.id)
      .then(eventInfo => res.json(eventInfo))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  eventInfoRouter.route('/eventInfos/:id').delete((req, res) => {
    EventInfo.findByIdAndDelete(req.params.id)
      .then(() => res.json(`Event info with id ${req.params.id} deleted`))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  eventInfoRouter.route('/eventInfos/updateEventInfo/:id').post((req, res) => {
    EventInfo.findById(req.params.id)
      .then(eventInfo => {
        eventInfo.name = req.body.name;
        eventInfo.date = Date.parse(req.body.date);
        eventInfo.time = Date.parse(req.body.time);
        if(req.body.location) {
          eventInfo.location = req.body.location
        }
        
        eventInfo.save()
          .then(() => res.json(`Contact with id ${req.params.id} updated`))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  export default eventInfoRouter