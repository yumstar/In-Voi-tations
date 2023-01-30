import Container  from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import  Button  from "react-bootstrap/Button"
import  Modal  from "react-bootstrap/Modal"
import axios from "axios"
import ContactUpdate from "./componentsUpdate/ContactUpdate"
import { useState } from "react"


export default function Contact(props) {
    // return <div>hi</div>
    const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
            
    return ( <Container className="contact">
    <Container className="border rounded">
            <Row xs="1">
            <span className="h3 float-left p-1">{"Name: " + props.info.firstName + " " + props.info.lastName}</span>
            </Row>
            <Row xs="2">
            <span className="h3 float-left">{"Phone: " + props.info.phone}</span>
            <span className="h3 float-right">{props.info.email && "E-mail: " + props.info.email}</span>
            </Row>
           {props.deleteFunction && <Button variant="danger" onClick={() => {props.deleteFunction(props.info._id)}}>Delete Contact</Button>}
           {props.canUpdate && <Button variant="warning" onClick={handleShow}>Update Contact</Button>}
    </Container>
      <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Contact Information</Modal.Title>
        </Modal.Header>
        <Modal.Body><ContactUpdate info={props.info}/></Modal.Body>
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