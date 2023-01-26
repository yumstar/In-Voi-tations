import express  from "express";

const inviteRouter = express.Router();


inviteRouter.route("inviteByEmail").post((req, res) => {
    const event = req.body.event;
    const list = req.body.list;
    
})

export default inviteRouter
