import ListGroup  from "react-bootstrap/ListGroup";
import Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import EventAdd from "./componentsAdd/EventAdd";
import { useEffect, useState } from "react";
import axios from "axios";
import EventInfo from "./Event"
import InvitationListAdd from "./componentsAdd/InvitationListAdd"
import InvitationList from "./InvitationList";
export default function InvitationListList() {
    // use 
    const [invitationLists, setInvitationLists] = useState([]);

    const getAllInvitationLists = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/invitationList/"
        })
        .then((res) => {
            if(res.status === 200){
                // console.log(res.data)
                setInvitationLists(res.data)
            }
            else if(res.data.status === 'fail') {
                // TO DO:
            }
        })
    }

    const deleteInvitationLists = (id) => {
        axios({
            method: "DELETE",
            url: "http://localhost:5000/invitationList/invitationLists/" + id
        })
        .then(res => {
            // Do something
            setInvitationLists(invitationLists.filter(event => event._id !== id))
        })
    }

    const inviteByEmail = (id) => {
        axios({
            method: "POST",
            url: "http://localhost:5000/invitationList/invitationLists/" + id + "/inviteByEmail",
            data: id
        })
        .then(res => {
            // Do something
        })
        .catch((error) => {console.log(error)})
    }
    useEffect(() => {
        getAllInvitationLists();
    },[])

    return <div className="invitation-lists">
        {/* <Container className="events-list"> */}
            {invitationLists.map((invitationList) =>{ return <InvitationList info={invitationList} event={invitationList.event} list={invitationList.list} deleteFunction={deleteInvitationLists} inviteFunction={inviteByEmail} canUpdate/>})}
        {/* </Container> */}
        <div className="add-new-event gap-2">
         <Container>
         <InvitationListAdd></InvitationListAdd>
            </Container>   
        </div>
    </div>
}