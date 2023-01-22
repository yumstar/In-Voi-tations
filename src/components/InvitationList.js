import ListGroup  from "react-bootstrap/ListGroup";
import Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import EventAdd from "./componentsAdd/EventAdd";
import { useEffect, useState } from "react";
import axios from "axios";
import EventInfo from "./Event"
export default function InvitationList() {
    // use 
    const [events, setEvents] = useState([]);

    const getAllEvents = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/eventInfo/"
        })
        .then((res) => {
            if(res.status === 200){
                // console.log(res.data)
                setEvents(res.data)
            }
            else if(res.data.status === 'fail') {
                // TO DO:
            }
        })
    }

    const deleteEvent = (id) => {
        axios({
            method: "DELETE",
            url: "http://localhost:5000/eventInfo/eventInfos/" + id
        })
        .then(res => {
            // Do something
            setEvents(events.filter(event => event._id !== id))
        })
    }
    useEffect(() => {
        getAllEvents();
    },[])

    return <div className="events">
        {/* <Container className="events-list"> */}
            {events.map((eventInfo) =>{ return <EventInfo info={eventInfo} deleteFunction={deleteEvent}/>})}
        {/* </Container> */}
        <div className="add-new-event gap-2">
         <Container>
         <EventAdd></EventAdd>
            </Container>   
        </div>
    </div>
}