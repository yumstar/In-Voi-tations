import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button  from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import Container  from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast"
import ToastContainer  from "react-bootstrap/ToastContainer";
import { FloatingLabel } from "react-bootstrap";
import { RiContactsBookLine } from "react-icons/ri";
export default function ContactUpdate(props){


const [contact, setContact] = useState({
    firstName: props.info.firstName,
    lastName: props.info.lastName,
    birthday: new Date(),
    phone: props.info.phone,
    email: props.info.email
})

const [showToast, setShowToast] = useState(false)
const [toastMessage, setToastMessage] = useState("");

const toggleShowToast = () => {setShowToast(!showToast)}

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
        url: "http://localhost:5000/contact/contacts/updateContact/" + props.info._id,
        data: contact
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
 return(
  <Container className="contact-update">
  <Container className="contact-update-form">
    <Form>
    <RiContactsBookLine className="fs-1 d-block m-auto"/>
        <Form.Group controlId="inputfirstName">
        <FloatingLabel controlId="floatingLabelFirstName" label="First Name" className="mt-3 text-muted">
        <Form.Control type="text" placeholder="First Name" value={contact.firstName} onChange={onChangeFirstName}/>
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="inputLastName">
      <FloatingLabel controlId="floatingLabelLastName" label="Last Name" className="mt-3 text-muted">
        <Form.Control type="text" placeholder="Last Name" value={contact.lastName} onChange={onChangeLastName}/>
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="inputPhone">
      <FloatingLabel controlId="floatingLabelPhone" label="Phone" className="mt-3 text-muted">
        <Form.Control type="text" placeholder="Phone" value={contact.phone} onChange={onChangePhone}/>
        </FloatingLabel>
        <Form.Text className="text-muted">
          (Optional)
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="inputEmail">
      <FloatingLabel controlId="floatingLabelEmail" label="Email" className="mt-3 text-muted">
        <Form.Control type="email" placeholder="Email" value={contact.email} onChange={onChangeEmail}/>
        </FloatingLabel>
        <Form.Text className="text-muted">
          (Optional)
        </Form.Text>
      </Form.Group>
      <Button type="submit" onClick={handleSubmit} className="my-3"variant="success" size="lg">Update Contact</Button>
    </Form>
    </Container>
    <ToastContainer position="bottom-end">
    <Toast show={showToast} onClose={toggleShowToast}>
          <Toast.Header>
            <strong className="me-auto">In-voi-tations</strong>
            <small>Friends</small>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
          
        </Toast>
    </ToastContainer>
    </Container>)
}