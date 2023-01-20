import { useState } from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
export default function ContactAdd(){


[contact, setContact] = useState({
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
    setContact({...contact, firstName: e.target.value})
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
        url: "http://localhost/5000/contact/addContact",
        data: contact
    })
    .then((res) => {
        if(Response.data.status === 'fail') {
            // TO DO:
        }
    })
}
 return(
    <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

    </Form>)
}