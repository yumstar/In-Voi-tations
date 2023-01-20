import { useState } from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button  from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
export default function ContactAdd(){


const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    birthday: new Date(),
    phone: '',
    email: ''
})

const onChangeFirstName = (e) => {
    setContact({...contact, firstName: e.target.value})
}
const onChangeLastName = (e) => {
    setContact({...contact, lastName: e.target.value})
}
// const onChangeBirthday = (e) => {
//     setContact({...contact, firstName: e.target.value})
// }
const onChangeEmail = (e) => {
    setContact({...contact, email: e.target.value})
}

const onChangePhone = (e) => {
    setContact({...contact, phone: e.target.value})
}

const handleSubmit = (e) => {
    e.preventDefault()
    axios({
        method: "POST",
        url: "http://localhost:5000/contact/addContact",
        data: contact
    })
    .then((res) => {
        if(Response.data.status === 'fail') {
            // TO DO:
        }
    })
}

//TO DO: replace with floating labels if have time
// TO DO: modal-ize
 return(
    <Form>
        <Form.Group controlId="inputfirstName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control type="text" placeholder="First Name" value={contact.firstName} onChange={onChangeFirstName}/>
      </Form.Group>
      <Form.Group controlId="inputLastName">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control type="text" placeholder="Last Name" value={contact.lastName} onChange={onChangeLastName}/>
      </Form.Group>
      <Form.Group controlId="inputPhone">
        <Form.Label>Phone:</Form.Label>
        <Form.Control type="text" placeholder="Phone" value={contact.phone} onChange={onChangePhone}/>
      </Form.Group>
      <Form.Group controlId="inputEmail">
        <Form.Label>E-mail:</Form.Label>
        <Form.Control type="email" placeholder="Email" value={contact.email} onChange={onChangeEmail}/>
      </Form.Group>
      {/* <Form.Text>Birthday</Form.Text>
      <Row>
      <Form.Group controlId="inputBirthdayMonth">
        <Form.Label>Month</Form.Label>
        <Form.Control type="" placeholder="Email" value={contact.email} onChange={onChangeEmail}/>
      </Form.Group>
      </Row> */}

      <Button type="submit" onClick={handleSubmit} className="m-3"variant="success" size="lg">Add Contact</Button>
    </Form>)
}