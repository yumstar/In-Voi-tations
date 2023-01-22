import { useState, useEffect } from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button  from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
// import EventInfo from "../../../server/models/eventInfo.model";
// import Contact from "../../../server/models/contact.model";
export default function ContactAdd(){


const [contactList, setContactList] = useState([])
const [eventInfo, setEventInfo] = useState({name: "sss"})
const [contacts, setContacts] = useState([])
const [events, setEvents] = useState([])

const getAllEvents = () => {
  axios({
      method: "GET",
      url: "http://localhost:5000/eventInfo/"
  })
  .then((res) => {
      if(res.status === 200){
          // console.log(res.data)
          setEvents(res.data)
          console.log(events)
  
      }
      else if(res.data.status === 'fail') {
          // TO DO:
      }
  })
}

const getAllContacts = () => {
  axios({
      method: "GET",
      url: "http://localhost:5000/contact/"
  })
  .then((res) => {
      if(res.status === 200){
          // console.log(res.data)
          setContacts(res.data)
          console.log(contacts)
      }
      else if(res.data.status === 'fail') {
          // TO DO:
      }
  })
}
useEffect(() => {
  getAllEvents();
  getAllContacts();
}, [])

const getEventsOptions = () => {
  return events.map(eventInfo => {return <option value={eventInfo._id}>{eventInfo.name}</option>})
}

const getContactsOptions = () => {
  return contacts.map(contact => {return <option value={contact._id}>{contact.firstName + " " + contact.lastName}</option>})
}

const onChangeEvent = (e) => {
  const eventsWithId = events.filter(event => event._id = e.target.value)
  const eventWithId = eventsWithId[0]
  setEventInfo(eventWithId);
}
const onChangeContactList = (e) => {
  const contactsWithId = contacts.filter(contact => contact._id = e.target.value)
  const contactWithId = contactsWithId[0]
  setContactList([...contactList, contactWithId]);
}
const handleSubmit = (e) => {
    e.preventDefault()
    const finalInvitationList = {event: eventInfo, list: contactList}
    axios({
        method: "POST",
        url: "http://localhost:5000/invitationList/addInvitationList",
        data: finalInvitationList
    })
    .then((res) => {
        if(res.data.status === 'fail') {
            // TO DO:
        }
        else if (res.status === 200) {
          window.location.reload();
        }
    })
}

//TO DO: replace with floating labels if have time
// TO DO: modal-ize
// getAllEvents();
// getAllContacts();
 return  (<Form>
    <Form.Group controlId="inputEvent">
      <Form.Label>Event:</Form.Label>
      <Form.Select value={eventInfo} onChange={onChangeEvent}>
      {getEventsOptions()}
    </Form.Select>
    </Form.Group>
    <Form.Group controlId="inputContacts">
      <Form.Label>Contacts</Form.Label>
      <Form.Select value={contactList[0]} onChange={onChangeContactList}>
      {getContactsOptions()}
    </Form.Select>
    </Form.Group>
    {/* //     <Form.Group controlId="inputfirstName">
    //     <Form.Label>First Name:</Form.Label>
    //     <Form.Control type="text" placeholder="First Name" value={contact.firstName} onChange={onChangeFirstName}/>
    //   </Form.Group>
    //   <Form.Group controlId="inputLastName">
    //     <Form.Label>Last Name:</Form.Label>
    //     <Form.Control type="text" placeholder="Last Name" value={contact.lastName} onChange={onChangeLastName}/>
    //   </Form.Group>
    //   <Form.Group controlId="inputPhone">
    //     <Form.Label>Phone:</Form.Label>
    //     <Form.Control type="text" placeholder="Phone" value={contact.phone} onChange={onChangePhone}/>
    //   </Form.Group>
    //   <Form.Group controlId="inputEmail">
    //     <Form.Label>E-mail:</Form.Label>
    //     <Form.Control type="email" placeholder="Email" value={contact.email} onChange={onChangeEmail}/>
    //   </Form.Group> */}
       {/* <Form.Text>Birthday</Form.Text>
    //   <Row>
    //   <Form.Group controlId="inputBirthdayMonth">
    //     <Form.Label>Month</Form.Label>
    //     <Form.Control type="" placeholder="Email" value={contact.email} onChange={onChangeEmail}/>
    //   </Form.Group>
    //   </Row> */}

    <Button type="submit" onClick={handleSubmit} className="m-3"variant="success" size="lg">Invite</Button>
     </Form>)
}