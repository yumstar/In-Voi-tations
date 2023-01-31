import { useState } from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button  from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import dateFormat from "dateformat";
import Col from 'react-bootstrap/Col';
import { useEffect } from "react";
import Container  from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast"
import ToastContainer  from "react-bootstrap/ToastContainer";
import { FloatingLabel } from "react-bootstrap";
import { MdOutlineEventNote } from "react-icons/md";
export default function EventUpdate(props){

const PERIODS = [
    {
        text: "AM",
        value: 0
    },
    {
        text: "PM",
        value: 12
    }
]


const MINUTESINHOURS = 60
const [eventInfo, setEvent] = useState({
    name: props.info.name,
    location: props.info.location,
    year: (new Date (props.info.date)).getFullYear(),
    month: (new Date (props.info.date)).getMonth(),
    day: (new Date (props.info.date)).getDate(),
    // date: new Date(),
    hour: (new Date (props.info.time)).getHours(),
    minute: (new Date (props.info.time)).getMinutes(),
    period:  (new Date (props.info.time)).getHours() < 12? PERIODS[0] : PERIODS[1]  
})

const [showToast, setShowToast] = useState(false)
const [toastMessage, setToastMessage] = useState("");

const toggleShowToast = () => {setShowToast(!showToast)}

const getYearsOptions = () => {
    const years = []
    const currentYear = new Date();
    years[0] = currentYear.getFullYear();
    for(var i = 1; i < 10; i++) {years[i] = years[0] + i;}
    return years.map(year => {return <option value={year}>{year}</option>})
}
const getMonthsOptions = () => {
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    return months.map(month => {return <option value={month}>{month+1}</option>})
}
const getDatesOptions = () => {
    let lastDateInMonth;
    if((eventInfo.month === 1 && eventInfo.year % 4 == 0)) {
        lastDateInMonth = 29;
    }
    else if(eventInfo.month == 1 ) {
        lastDateInMonth = 28;
    }
    else if((eventInfo.month % 2 === 0 && eventInfo.month < 7) || (eventInfo.month % 2 === 1 && eventInfo.month >= 7)) {
        lastDateInMonth = 31;
    }
    else {
        lastDateInMonth = 30
    }
    // const days = 31
    const datesInMonth = [];
    for(var i = 0; i < lastDateInMonth; i++) {datesInMonth[i] = i+1;}
    // // for(var i = 0; i < lastDateInMonth; i++) {datesInMonth[i] = i + 1;}
    return datesInMonth.map(date => {return <option value={date}>{date}</option>})
}
const getHourOptions = () => {
    const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    return hours.map(hour => {return <option value={hour % 12}>{hour}</option>}) 
}
const getMinutesOptions = () => {
    var minutes = []
    for(var i = 0; i < MINUTESINHOURS; i++) {
        minutes.push(i)
    }
    return minutes.map(minute => {return <option value={minute}>{(minute < 10? "0" : "") + minute}</option>}) 
}
const getPeriodOptions = () => {
    return PERIODS.map(period => {return <option value={period.value}>{period.text}</option>})
}
const onChangeName = (e) => {
    setEvent({...eventInfo, name: e.target.value})
}
const onChangeLocation = (e) => {
    setEvent({...eventInfo, location: e.target.value})
}
// const onChangeDateYear = (e) => {
//     setEvent({...eventInfo, year: eventInfo.date.setFullYear(e.target.value)});
//     onChangeDateDate();
// }
const onChangeDateYear = (e) => {
    setEvent({...eventInfo, year: e.target.value, day: 0});
    // onChangeDateDate();
}
const onChangeDateMonth = (e) => {
    setEvent({...eventInfo, month: e.target.value, day: 0});
    // onChangeDateDate();
}
// const onChangeDateMonth = (e) => {
//     setEvent({...eventInfo, month: eventInfo.date.setMonth(e.target.value - 1)});
//     onChangeDateDate();
// }

const onChangeDateDate = (e) => {
    setEvent({...eventInfo, day: e.target.value});
    console.log()
}

const onChangeTimeHour = (e) => {
    setEvent({...eventInfo, hour: parseInt(e.target.value) + eventInfo.period.value});
    console.log(eventInfo)
}
const onChangeTimeMinute = (e) => {
    setEvent({...eventInfo, minute: parseInt(e.target.value)});
    console.log(eventInfo)
}
const onChangeTimePeriod = (e) => {
    const matchingPeriods = PERIODS.filter(period => period.value == e.target.value)
    const matchingPeriod = matchingPeriods[0]
    setEvent({...eventInfo, period: matchingPeriod})
}

const handleSubmit = (e) => {
    e.preventDefault()
    const eventInfoDated = {...eventInfo, date: new Date(eventInfo.year, eventInfo.month, eventInfo.day), time: new Date(eventInfo.year, eventInfo.month, eventInfo.day, eventInfo.hour, eventInfo.minute)};
    axios({
        method: "POST",
        url: "http://localhost:5000/eventInfo/eventInfos/updateEventInfo/"  + props.info._id,
        data: eventInfoDated
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
    <Container className="event-update">
    <Container className="event-update-form">
    <Form>
    <MdOutlineEventNote className="fs-1 d-block m-auto"/>
        <Form.Group controlId="inputName">
        <FloatingLabel controlId="floatingLabelName" label="Name" className="mt-3 text-muted">
        <Form.Control type="text" placeholder="Name" value={eventInfo.name} onChange={onChangeName}/>
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="inputLocation">
      <FloatingLabel controlId="floatingLabelLocation" label="Location" className="mt-3 text-muted">
        <Form.Control type="text" placeholder="Location" value={eventInfo.location} onChange={onChangeLocation}/>
        </FloatingLabel>
        <Form.Text className="text-muted d-block text-center">
          (Optional)
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="inputDate">
      <Form.Label className="text-center d-block mb-1 mt-2">Date:</Form.Label>
      <Row>
      <Col>
      <FloatingLabel controlId="floatingLabelYear" label="Year" className="mt-3 text-muted">
      <Form.Select value={eventInfo.year} onChange={onChangeDateYear}>
      {getYearsOptions()}
    </Form.Select>
    </FloatingLabel>
    </Col>
    <Col>
    <FloatingLabel controlId="floatingLabelMonth" label="Month" className="mt-3 text-muted">
    <Form.Select value={eventInfo.month} onChange={onChangeDateMonth}>
      {getMonthsOptions()}
    </Form.Select>
    </FloatingLabel>
    </Col>
    <Col>
    <FloatingLabel controlId="floatingLabelDay" label="Day" className="mt-3 text-muted">
    <Form.Select value={eventInfo.day} onChange={onChangeDateDate}>
      {getDatesOptions()}
    </Form.Select>
    </FloatingLabel>
    </Col>
    </Row>
      </Form.Group>
      <Form.Group controlId="inputTime">
      <Form.Label className="text-center d-block mb-1 mt-2">Time:</Form.Label>
      <Row>
      <Col>
      <FloatingLabel controlId="floatingLabelHour" label="Hour" className="mt-3 text-muted">
        <Form.Select value={eventInfo.hour} onChange={onChangeTimeHour}>
            {getHourOptions()}
        </Form.Select>
        </FloatingLabel>
        </Col>
        <Col>
        <FloatingLabel controlId="floatingLabelMinute" label="Minute" className="mt-3 text-muted">
        <Form.Select value={eventInfo.minute} onChange={onChangeTimeMinute}>
            {getMinutesOptions()}
        </Form.Select>
        </FloatingLabel>
        </Col>
        <Col>
        <FloatingLabel controlId="floatingLabelPeriod" label="Period" className="mt-3 text-muted">
        <Form.Select value={eventInfo.period.value} onChange={onChangeTimePeriod}>
            {getPeriodOptions()}
        </Form.Select>
        </FloatingLabel>
        </Col>
      </Row>
      </Form.Group>
      <Button type="submit" onClick={handleSubmit} className="my-3"variant="success" size="lg">Update Event</Button>
    </Form>
    </Container>
    <ToastContainer position="bottom-end">
    <Toast show={showToast} onClose={toggleShowToast}>
          <Toast.Header>
            <strong className="me-auto">In-voi-tations</strong>
            <small>Events</small>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>     
        </Toast>
    </ToastContainer>
    </Container>)
}