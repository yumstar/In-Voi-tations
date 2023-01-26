import { useState, useEffect } from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button  from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import BootstrapSelect from 'react-bootstrap-select-dropdown'
// import EventInfo from "../../../server/models/eventInfo.model";
// import Contact from "../../../server/models/contact.model";
export default function ContactAdd(){

const [contactOptions, setContactOptions] = useState([]);
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
          // console.log(events)
  
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
          // console.log(contacts)
      }
      else if(res.data.status === 'fail') {
          // TO DO:
      }
  })
}
useEffect(() => {
  if(events.length === 0) {
    getAllEvents();
  }
    
}, [events])

useEffect(() => {
  if(contacts.length === 0) {
    getAllContacts();
  }
  if(contactOptions.length === 0) {
    getContactsOptions();
  }
  // getContactsOptions();
}, [contacts])

const getEventsOptions = () => {
  return events.map(eventInfo => {return <option value={eventInfo._id}>{eventInfo.name}</option>})
}


const getContactsOptions = () => {
 contacts.forEach((contact, index) => {contactOptions[index] = {
  "labelKey": contact._id,
  "value": contact.firstName + " " + contact.lastName
 }
})
}

const onChangeEvent = (e) => {
  const eventsWithId = events.filter(event => event._id === e.target.value)
  const eventWithId = eventsWithId[0]
  setEventInfo(eventWithId);
}

const onChangeContactList = (selectedOptions) => {
  var selectedContacts = selectedOptions.selectedKey
  selectedContacts.forEach((item) => {
    const contactsWithId = contacts.filter(contact => contact._id === item)
    const contactWithId = contactsWithId[0]
    if(!contactList.find(contact => contact._id === contactWithId._id)) {
      setContactList([...contactList, contactWithId])
    }
  } )
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
 return  (<Form>
    <Form.Group controlId="inputEvent">
      <Form.Label>Event:</Form.Label>
      <Form.Select onChange={onChangeEvent} value={null}>
      {getEventsOptions()}
    </Form.Select>
    </Form.Group>
    <Form.Group controlId="inputContacts">
      <Form.Label>Contacts: </Form.Label>
      {/* <Form.Select value={contactList} onChange={onChangeContactList}> */}
      <BootstrapSelect options={contactOptions} onChange={onChangeContactList} isMultiSelect/>
      {/* {getContactsOptions()} */}
    {/* </Form.Select> */}
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

    <Button type="submit" onClick={handleSubmit} className="m-3"variant="success" size="lg">Set List</Button>
     </Form>)
}