import { Container } from "react-bootstrap";
import { GiPartyFlags } from "react-icons/gi";
import { GiPartyHat } from "react-icons/gi";
import { GiPartyPopper } from "react-icons/gi";
import { Link } from "react-router-dom";
function MainPage() {
    
    return <Container className="main-page">
    <Container className="main-page-title">
    <h1 className='my-5'>Welcome!</h1>
    </Container>
    <Container className="main-page-body">
        
    <p>Start by adding your contacts on the <Link to="/friends">Friends</Link> page.</p>
    <GiPartyHat className="fs-1 my-2"/>
    <p>Fill in the details of the event you're planning on the <Link to="/events">Events</Link>  Page.</p>
    <GiPartyFlags className="fs-1 my-2"/>
    <p>Create a list of friends to invite to an event and <Link to="/invite">invite</Link> them by email.</p>
    <GiPartyPopper className="fs-1 my-2"/>
    </Container>
    </Container>
}

export default MainPage