import ListGroup  from "react-bootstrap/ListGroup";
import Button  from "react-bootstrap/Button";
import Container  from "react-bootstrap/Container";
import EventAdd from "./componentsAdd/EventAdd";
import { useEffect, useState } from "react";
import axios from "axios";
import EventInfo from "./Event"
import InvitationListAdd from "./componentsAdd/InvitationListAdd"
import InvitationList from "./InvitationList";
import Toast from "react-bootstrap/Toast"
import ToastContainer  from "react-bootstrap/ToastContainer";
export default function InvitationListList() {
    // use 
    const [invitationLists, setInvitationLists] = useState([]);

    const [showToast, setShowToast] = useState(false)
const [toastMessage, setToastMessage] = useState("");

const toggleShowToast = () => {setShowToast(!showToast)}

    const getAllInvitationLists = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/invitationList/"
        })
        .then((res) => {
            if(res.status === 200){
                // console.log(res.data)
                setInvitationLists(res.data)
            }
            else if(res.data.status === 'fail') {
                setToastMessage("Invitations lists could not be retrieved");
                setShowToast(true)
            }
        })
    }

    const deleteInvitationLists = (id) => {
        axios({
            method: "DELETE",
            url: "http://localhost:5000/invitationList/invitationLists/" + id
        })
        .then(res => {
            // Do something
            setInvitationLists(invitationLists.filter(event => event._id !== id))
            if (res.status >= 200 && res.status < 300) {
                setToastMessage(res.data);
                setShowToast(true)
                setTimeout(() => {window.location.reload();}, 1000)
              }
        })
        .catch((error) => {
            setToastMessage("Invitation List with id " + id + " could not be deleted");
            setShowToast(true)
        })
    }

    const inviteByEmail = (id) => {
        axios({
            method: "POST",
            url: "http://localhost:5000/invitationList/invitationLists/" + id + "/inviteByEmail",
            data: id
        })
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                setToastMessage(res.data);
                setShowToast(true)
              }
        })
        .catch((error) => {
            setToastMessage(error.response.data.error);
            setShowToast(true)
        })
    }

    const inviteBySMS = (id) => {
        axios({
            method: "POST",
            url: "http://localhost:5000/invitationList/invitationLists/" + id + "/inviteBySMS",
            data: id
        })
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                setToastMessage(res.data);
                setShowToast(true)
              }
        })
        .catch((error) => {
            setToastMessage(error.response.data.error);
            setShowToast(true)
        })
    }
    useEffect(() => {
        getAllInvitationLists();
    },[])

    return <Container className="invitation-lists">
        <h1 className="mt-3 mb-4">Invitation Lists</h1>
        <Container className="invitation-list-list">
            {invitationLists.map((invitationList, i) =>{ return <InvitationList id={invitationList._id}info={invitationList} event={invitationList.event} list={invitationList.list} deleteFunction={deleteInvitationLists} inviteFunctions={[{func: inviteByEmail, method: "Email"}, {func:inviteBySMS, method: "SMS"} ]} childIndex={i} key={i} canUpdate/>})}
        </Container>
        <Container className="add-new-event gap-2">
         <Container>
         <InvitationListAdd></InvitationListAdd>
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
        </Container>
    </Container>
}