import Container  from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import  Col  from "react-bootstrap/Col"
import  Button  from "react-bootstrap/Button"
import  Modal  from "react-bootstrap/Modal"
import axios from "axios"
import ContactUpdate from "./componentsUpdate/ContactUpdate"
import { RiContactsFill } from "react-icons/ri";
import { RiContactsLine } from "react-icons/ri";
import { useState } from "react"


export default function Contact(props) {
    // return <div>hi</div>
    const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
            
    return ( <Container className="contact">
    <Container className="border rounded">
            <Row xs="1">
            {props.childIndex % 2 == 0? <RiContactsLine className="mt-3"/ > : <RiContactsFill className="mt-3"/>}
            <span className="h3 text-center">{"Name: " + props.info.firstName + " " + props.info.lastName}</span>
           
            </Row>
            <Row xs="2">
            <span className="h3 my-2">{"Phone: " + props.info.phone}</span>
            <span className="h3 my-2">{props.info.email && "E-mail: " + props.info.email}</span>
            </Row>
           {props.deleteFunction && <Button className="my-3 mx-4 p-2" variant="danger" onClick={() => {props.deleteFunction(props.info._id)}}>Delete Contact</Button>}
           {props.canUpdate && <Button className="my-3 mx-4 p-2" variant="warning" onClick={handleShow}>Update Contact</Button>}
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