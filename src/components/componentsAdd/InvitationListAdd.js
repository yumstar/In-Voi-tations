import { useState, useEffect } from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import BootstrapSelect from 'react-bootstrap-select-dropdown'
import Toast from "react-bootstrap/Toast"
import Container from "react-bootstrap/Container"
import ToastContainer from "react-bootstrap/ToastContainer";
import { FloatingLabel } from "react-bootstrap";
import { BsEnvelopeOpen } from "react-icons/bs";
export default function InvitaionListAdd(){

  const [contactOptions, setContactOptions] = useState([]);
  const [contactList, setContactList] = useState([])
  const [eventInfo, setEventInfo] = useState({ name: "sss" })
  const [contacts, setContacts] = useState([])
  const [events, setEvents] = useState([])
  const [checkedContactDB, setCheckedContactDB] = useState(false);
  const [checkedEventDB, setCheckeEventDB] = useState(false)

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("");

  const toggleShowToast = () => { setShowToast(!showToast) }

  const getAllEvents = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/eventInfo/"
    })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data)
          setEvents(res.data)
          // console.log(events)

        }
        else if (res.data.status === 'fail') {
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
  if(!checkedEventDB && events.length === 0) {
    getAllEvents();
    setCheckeEventDB(true);
  }
  if(events.length > 0 ) {
    setEventInfo(events[0])
  }
  
}, [events])

useEffect(() => {
  if(!checkedContactDB && contacts.length === 0) {
    getAllContacts();
    setCheckedContactDB(true)
  }
  if(contactOptions.length === 0) {
    getContactsOptions();
  }
  // getContactsOptions();
}, [contacts])


useEffect(() => {

})
const getEventsOptions = () => {
  return events.map(eventInfo => {return <option value={eventInfo._id}>{eventInfo.name}</option>})
}

// const getContactsOptions = () => {
//   contacts.forEach((contact, index) => {setContactOptions([...contactOptions, {
//    "labelKey": contact._id,
//    "value": contact.firstName + " " + contact.lastName
//   }
//  ])})
//  }

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
      if (res.status >= 200 && res.status < 300) {
        setToastMessage(res.data);
        setShowToast(true)
        setTimeout(() => {window.location.reload();}, 1000)
        
      }
  }).catch((error) => {
      setToastMessage(error.response.data.error);
      setShowToast(true)
  })
}

//TO DO: replace with floating labels if have time
// TO DO: modal-ize
 return  (<Container className="invitation-list-add">
 <Container className="invitation-list-add-form">
 <Form>
  <h2 className="h2 mt-3">Create a new list of invitations:</h2>
  <BsEnvelopeOpen className="fs-1 mt-2"/>
    <Form.Group controlId="inputEvent">
    <FloatingLabel controlId="floatingLabelEvent" label="Event" className="mt-4 text-muted">
      <Form.Select onChange={onChangeEvent} value={null}>
      {getEventsOptions()}
    </Form.Select>
    </FloatingLabel>
    </Form.Group>
    <Form.Group controlId="inputContacts">
      <Form.Label className="d-block mt-3">Contacts: </Form.Label>
      <BootstrapSelect options={contactOptions} onChange={onChangeContactList} isMultiSelect/>
    <Form.Text className="text-muted d-block">
          (Optional)
        </Form.Text>
    </Form.Group>

    <Button type="submit" onClick={handleSubmit} className="m-3 mt-4"variant="success" size="lg">Set List</Button>
     </Form>
     </Container>
    <ToastContainer position="bottom-end">
    <Toast show={showToast} onClose={toggleShowToast}>
          <Toast.Header>
            <strong className="me-auto">In-voi-tations</strong>
            <small>Send Invitations</small>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
          
        </Toast>
    </ToastContainer>
    </Container>)
}