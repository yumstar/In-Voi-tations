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
    const [contacts, setContacts] = useState({
        contactsList: []
    });

    const getAllContacts = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/contact/"
        })
        .then((res) => {
            if(res.data.status === 'success'){
                setContacts({contactsList: res.data})
            }
            else if(res.data.status === 'fail') {
                // TO DO:
            }
        })
    }
    useEffect(() => {
        getAllContacts();
    }
    )

    const ContactsComponents = contacts.contactsList.map(contactInfo => <Contact info={contactInfo}/>);
    return <div className="contacts">
        <Container className="contacts-list">
            {ContactsComponents}
        </Container>
        <div className="add-new-contact gap-2">
         <Container>
         <ContactAdd></ContactAdd>
            </Container>   
        </div>
    </div>
}