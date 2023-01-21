import mongoose from "mongoose";
import invitationListSchema from "../schema/invitationList.schema.js"
const InvitationList = mongoose.model('Invitation List', invitationListSchema)

export default InvitationList