import Container  from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import  Button  from "react-bootstrap/Button"
import axios from "axios"

const deleteContact = () => {

}
export default function Contact(props) {
    // return <div>hi</div>
    return ( <Container className="border rounded">
            <Row xs="1">
            <span className="h3 float-left p-1">{"Name: " + props.info.firstName + " " + props.info.lastName}</span>
            </Row>
            <Row xs="2">
            <span className="h3 float-left">{"Phone: " + props.info.phone}</span>
            <span className="h3 float-right">{props.info.email && "E-mail: " + props.info.email}</span>
            </Row>
           {props.deleteFunction && <Button variant="danger" onClick={() => {props.deleteFunction(props.info._id)}}>Delete Contact</Button>}
    </Container>
    )
}