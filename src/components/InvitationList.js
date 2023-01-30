import { Container } from "react-bootstrap";
import Contact from "./Contact";
import EventInfo from "./Event";
import Button  from "react-bootstrap/Button";
import  Modal  from "react-bootstrap/Modal"
import InvitationListUpdate from "./componentsUpdate/InvitationListUpdate";
import { useState } from "react";
export default function InvitationList(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( <Container className="invitation-list">
        <Container className="p-3">
        <p className="h2">{"Invite List for " + props.event.name}</p>
        <EventInfo info={props.event}/>
        {props.list.map(contact => {return <Contact info={contact} />})}
        {/* <Button type="submit" onClick={handleSubmitEmail} className="m-3"variant="success" size="lg">Invite By Email</Button> */}
        {props.deleteFunction && <Button variant="danger" onClick={() => {props.deleteFunction(props.info._id)}}>Delete List</Button>}
        {props.canUpdate && <Button variant="warning" onClick={handleShow}>Update List</Button>}
        {props.inviteFunction && <Button variant="success" onClick={() => {props.inviteFunction(props.info._id)}}>Invite By Email</Button>}
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