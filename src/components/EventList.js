import ListGroup  from "react-bootstrap/ListGroup";
import Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import EventAdd from "./componentsAdd/EventAdd";
import { useEffect, useState } from "react";
import axios from "axios";
import EventInfo from "./Event"
import Toast from "react-bootstrap/Toast"
import ToastContainer  from "react-bootstrap/ToastContainer";
export default function EventList() {
    // use 
    const [events, setEvents] = useState([]);

    const [showToast, setShowToast] = useState(false)
const [toastMessage, setToastMessage] = useState("");

const toggleShowToast = () => {setShowToast(!showToast)}

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
                setToastMessage("Events could not be retrieved");
                setShowToast(true)
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
            setToastMessage(res.data);
            setShowToast(true)
            setTimeout(() => {window.location.reload();}, 1000)
        })
        .catch((error) => {
            setToastMessage("Event with id " + id + " could not be deleted");
            setShowToast(true)
        })
    }
    useEffect(() => {
        getAllEvents();
    },[])

    return <Container className="events">
        <Container className="events-list">
            {events.map((eventInfo) =>{ return <EventInfo info={eventInfo} deleteFunction={deleteEvent} canUpdate/>})}
        </Container>
        <Container className="add-new-event gap-2">
         <Container>
         <EventAdd></EventAdd>
            </Container>
            <ToastContainer position="bottom-end">
    <Toast show={showToast} onClose={toggleShowToast}>
          <Toast.Header>
            <strong className="me-auto">In-voi-tations</strong>
            <small>Events</small>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
          
        </Toast>
    </ToastContainer>   
        </Container>
    </Container>
}