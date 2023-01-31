import { Container } from "react-bootstrap";
import Contact from "./Contact";
import EventInfo from "./Event";
import Button  from "react-bootstrap/Button";
import  Modal  from "react-bootstrap/Modal"
import InvitationListUpdate from "./componentsUpdate/InvitationListUpdate";
import { useState } from "react";
import { BsEnvelopeFill } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
export default function InvitationList(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( <Container className="invitation-list border rounded">
        <Container className="p-3">
        {props.childIndex % 2 == 0? <BsEnvelope className="my-3 fs-3"/ > : <BsEnvelopeFill className="mt-3 fs-3"/>}
        <p className="h2">{"Invite List #" + props.id}</p>
        <p className="h3 mt-4">Event:</p>
        <EventInfo info={props.event}/>

        {/* <Button type="submit" onClick={handleSubmitEmail} className="m-3"variant="success" size="lg">Invite By Email</Button> */}
        {props.deleteFunction && <Button className="my-3 mx-4 p-2" variant="danger" onClick={() => {props.deleteFunction(props.info._id)}}>Delete List</Button>}
        {props.canUpdate && <Button className="my-4 mx-4 p-2" variant="warning" onClick={handleShow}>Update List</Button>}
        {props.inviteFunction && <Button className="my-4 mx-4 p-2" variant="success" onClick={() => {props.inviteFunction(props.info._id)}}>Invite By Email</Button>}
        <p className="h3 mt-2">Friends:</p>
        {props.list.map((contact, i) => {return <Contact info={contact} childIndex={i}/>})}
        </Container>
        <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update List of Invitations</Modal.Title>
        </Modal.Header>
        <Modal.Body><InvitationListUpdate info={props.info}/></Modal.Body>
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