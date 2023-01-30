import { useState, useEffect } from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button  from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import BootstrapSelect from 'react-bootstrap-select-dropdown'
export default function InvitationListUpdate(props){

const [contactOptions, setContactOptions] = useState([]);
const [defaultContactOptions, setDefaultContactOptions] = useState([]);
const [contactList, setContactList] = useState(props.info.list)
const [eventInfo, setEventInfo] = useState(props.info.event)
const [contacts, setContacts] = useState([])
const [events, setEvents] = useState([])
const [checkedContactDB, setCheckedContactDB] = useState(false);
const [checkedEventDB, setCheckeEventDB] = useState(false)

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
    if(!checkedEventDB && events.length === 0) {
      getAllEvents();
      setCheckeEventDB(true);
      if(events.length > 0 ) {
        setEventInfo(props.info.event)
      }
    }

    
  }, [events])
  
  useEffect(() => {
    if(!checkedContactDB && contacts.length === 0) {
      getAllContacts();
      setCheckedContactDB(true)
    }
    if(contactOptions.length === 0) {
      getContactsOptions();
      getDefaultContactOptions();
    }
    // getContactsOptions();
  }, [contacts])

  useEffect(() => {
    console.log(props)
  }, [])

const getEventsOptions = () => {
  return events.map(eventInfo => {return <option value={eventInfo._id}>{eventInfo.name}</option>})
}



const getContactsOptions = () => {
    contacts.forEach((contact, index) => {contactOptions[index] = {
     "labelKey": contact._id,
     "value": contact.firstName + " " + contact.lastName,
     "isSelected": true
    //  "isSelected": contactList.find(otherContact => otherContact._id == contact._id) > 0? true: false
    }
   })
   }

const getDefaultContactOptions = () => {
    props.info.list.forEach((contact, index) => {defaultContactOptions[index] = {
        "labelKey": contact._id,
        "value": contact._id
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
      console.log(contactList)
      console.log(selectedContacts)
    }
    
  }
  )
    
  contactList.forEach((contactInList) => {
    if(!selectedContacts.find(selectedContact => selectedContact == contactInList._id)) {
        setContactList( contactList.filter(contact => contact._id !== contactInList._id))
        console.log(contactList)
        console.log(selectedContacts)
    }
  }
  )
}
const handleSubmit = (e) => {
    e.preventDefault()
    const finalInvitationList = {event: eventInfo, list: contactList}
    axios({
        method: "POST",
        url: "http://localhost:5000/invitationList/invitationLists/updateInvitationList/" + props.info._id,
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
      <BootstrapSelect options={contactOptions} defaultOptions={defaultContactOptions} onChange={onChangeContactList} isMultiSelect/>
      {/* {getContactsOptions()} */}
    {/* </Form.Select> */}
    </Form.Group>

    <Button type="submit" onClick={handleSubmit} className="m-3"variant="success" size="lg">Set List</Button>
     </Form>)
}