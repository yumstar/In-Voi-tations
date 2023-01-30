import ListGroup  from "react-bootstrap/ListGroup";
import Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import ContactAdd from "./componentsAdd/ContactAdd";
import { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./Contact"
export default function ContactList() {
    // use
    // const Contacts = 
    const [contacts, setContacts] = useState([]);

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
                // TO DO:
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
        })
    }
    useEffect(() => {
        getAllContacts();
    },[])
    // const ContactsComponents = ;
    return <div className="contacts">
        {/* <Container className="contacts-list"> */}
            {contacts.map((contactInfo) =>{ return <Contact info={contactInfo} deleteFunction={deleteContact} canUpdate/>})}
        {/* </Container> */}
        <div className="add-new-contact gap-2">
         <Container>
         <ContactAdd></ContactAdd>
            </Container>   
        </div>
    </div>
}