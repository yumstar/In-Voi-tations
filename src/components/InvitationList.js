import { Container } from "react-bootstrap";
import Contact from "./Contact";
import EventInfo from "./Event";
import Button  from "react-bootstrap/Button";

export default function InvitationList(props) {
    return  <Container className="p-3">
        <p className="h2">{"Invite List for " + props.event.name}</p>
        <EventInfo info={props.event}/>
        {props.list.map(contact => {return <Contact info={contact} />})}
        {/* <Button type="submit" onClick={handleSubmitEmail} className="m-3"variant="success" size="lg">Invite By Email</Button> */}
        {props.deleteFunction && <Button variant="danger" onClick={() => {props.deleteFunction(props.info._id)}}>Delete List</Button>}
        </Container>
}