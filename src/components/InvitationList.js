import { Container } from "react-bootstrap";
import Contact from "./Contact";
import EventInfo from "./Event";

export default function InvitationList(props) {
    return  <Container className="p-3">
        <p className="h2">{props.event.name}</p>
        <EventInfo info={props.event}/>
        {props.list.map(contact => {return <Contact info={contact} />})}
        </Container>
}