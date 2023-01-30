import ListGroup  from "react-bootstrap/ListGroup";
import Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import ContactAdd from "./componentsAdd/ContactAdd";
import { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./Contact"
import Toast from "react-bootstrap/Toast"
import ToastContainer  from "react-bootstrap/ToastContainer";

export default function ContactList() {
    // use
    // const Contacts = 
    const [contacts, setContacts] = useState([]);

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("");
    
    const toggleShowToast = () => {setShowToast(!showToast)}

    const getAllContacts = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/contact/"
        })
        .then((res) => {
            if(res.status === 200){
                // console.log(res.data)
                setContacts(res.data)
            }
            else if(res.data.status === 'fail') {
                setToastMessage("Contacts could not be retrieved");
                setShowToast(true)
            }
        })
    }

    const deleteContact = (id) => {
        axios({
            method: "DELETE",
            url: "http://localhost:5000/contact/contacts/" + id
        })
        .then(res => {
            // Do something
            setContacts(contacts.filter(contact => contact._id !== id))
            if (res.status >= 200 && res.status < 300) {
                setToastMessage(res.data);
                setShowToast(true)
                setTimeout(() => {window.location.reload();}, 1000)
              }
        })
        .catch((error) => {
            setToastMessage("Contact with id " + id + " could not be deleted");
            setShowToast(true)
        })
    }
    useEffect(() => {
        getAllContacts();
    },[])
    // const ContactsComponents = ;
    return <Container className="contacts">
        {/* <Container className="contacts-list"> */}
            {contacts.map((contactInfo) =>{ return <Contact info={contactInfo} deleteFunction={deleteContact} canUpdate/>})}
        {/* </Container> */}
        <Container className="add-new-contact gap-2">
         <Container>
         <ContactAdd></ContactAdd>
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
        </Container>
    </Container>
}