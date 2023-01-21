import { useState } from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button  from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
export default function EventAdd(){


const [event, setEvent] = useState({
    name: '',
    date: new Date(),
    time: new Date(),
})

const onChangeName = (e) => {
    setEvent({...event, name: e.target.value})
}
const onChangeDate = (e) => {
    setEvent({...event, email: new Date()})
}

const onChangeTime = (e) => {
    setEvent({...event, phone: new Date()})
}

const handleSubmit = (e) => {
    e.preventDefault()
    axios({
        method: "POST",
        url: "http://localhost:5000/eventInfo/addEventInfo",
        data: event
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
 return(
    <Form>
        <Form.Group controlId="inputName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="First Name" value={event.name} onChange={onChangeName}/>
      </Form.Group>
      <Form.Group controlId="inputDate">
        <Form.Label>Date:</Form.Label>
        <Form.Control type="text" placeholder="Last Name" value={event.date} onChange={onChangeDate}/>
      </Form.Group>
      <Form.Group controlId="inputTime">
        <Form.Label>Time:</Form.Label>
        <Form.Control type="text" placeholder="Phone" value={event.time} onChange={onChangeTime}/>
      </Form.Group>
      {/* <Form.Text>Birthday</Form.Text>
      <Row>
      <Form.Group controlId="inputBirthdayMonth">
        <Form.Label>Month</Form.Label>
        <Form.Control type="" placeholder="Email" value={event.email} onChange={onChangeEmail}/>
      </Form.Group>
      </Row> */}

      <Button type="submit" onClick={handleSubmit} className="m-3"variant="success" size="lg">Add Event</Button>
    </Form>)
}