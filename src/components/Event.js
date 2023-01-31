import Container  from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import  Button  from "react-bootstrap/Button"
import dateFormat from "dateformat"
import  Modal  from "react-bootstrap/Modal"
import EventUpdate from "./componentsUpdate/EventUpdate"
import { BsCalendar2Event } from "react-icons/bs";
import { BsCalendar2EventFill } from "react-icons/bs";
import { useState } from "react"
export default function EventInfo(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return ( <Container className="event">
    <Container className="border rounded">
    <Row xs="1">
    {props.childIndex % 2 == 0? <BsCalendar2Event className="mt-3 fs-3"/ > : <BsCalendar2EventFill className="mt-3 fs-3"/>}
    <span className="h3 text-center mt-3">{"Name: " + props.info.name}</span>
    {props.info.location && <span className="h3 float-left p-1">{"Location: " + props.info.location}</span>}
    </Row>
    <Row xs="2">
    <span className="h3 my-2">{"Date: " + dateFormat(props.info.date, "fullDate")}</span>
    <span className="h3 my-2">{props.info.time && "Time: " + dateFormat(props.info.time, "shortTime")}</span>
    </Row>
    {props.deleteFunction && <Button className="my-3 mx-4 p-2" variant="danger" onClick={() => {props.deleteFunction(props.info._id)}}>Delete Event</Button>}
    {props.canUpdate && <Button className="my-3 mx-4 p-2" variant="warning" onClick={handleShow}>Update Event</Button>}
</Container>
<Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event Information</Modal.Title>
        </Modal.Header>
        <Modal.Body><EventUpdate info={props.info}/></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
</Container>
)
}