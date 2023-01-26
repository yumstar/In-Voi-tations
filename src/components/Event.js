import Container  from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import  Button  from "react-bootstrap/Button"
import dateFormat from "dateformat"
export default function EventInfo(props) {
    return ( <Container className="border rounded">
    <Row xs="1">
    <span className="h3 float-left p-1">{"Name: " + props.info.name}</span>
    </Row>
    <Row xs="2">
    <span className="h3 float-left">{"Date: " + dateFormat(props.info.date, "fullDate")}</span>
    <span className="h3 float-right">{props.info.time && "Time: " + props.info.time}</span>
    </Row>
    {props.deleteFunction && <Button variant="danger" onClick={() => {props.deleteFunction(props.info._id)}}>Delete Event</Button>}
</Container>
)
}