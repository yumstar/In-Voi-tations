import ListGroup  from "react-bootstrap/ListGroup";
import Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import EventAdd from "./componentsAdd/EventAdd";
import { useEffect, useState } from "react";
import axios from "axios";
import EventInfo from "./Event"
import InvitationListAdd from "./componentsAdd/InvitationListAdd"
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
    useEffect(() => {
        getAllInvitationLists();
    },[])

    return <div className="invitation-lists">
        {/* <Container className="events-list"> */}
            {/* {events.map((eventInfo) =>{ return <EventInfo info={eventInfo} deleteFunction={deleteEvent}/>})} */}
        {/* </Container> */}
        <div className="add-new-event gap-2">
         <Container>
         <InvitationListAdd></InvitationListAdd>
            </Container>   
        </div>
    </div>
}