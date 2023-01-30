import { useState } from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button  from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import dateFormat from "dateformat";
import { useEffect } from "react";
import Toast from "react-bootstrap/Toast"
import Container from "react-bootstrap/Container"
import ToastContainer  from "react-bootstrap/ToastContainer";
export default function EventAdd(){

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
    name: '',
    location: '',
    year: (new Date()).getFullYear(),
    month: 0,
    day: 1,
    // date: new Date(),
    hour: 0,
    minute: 0,
    period: PERIODS[0] 

})
const [showToast, setShowToast] = useState(false)
const [toastMessage, setToastMessage] = useState("");

const toggleShowToast = () => {setShowToast(!showToast)}

const getYearsOptions = () => {
    const years = []
    const currentYear = new Date();
    years[0] = currentYear.getFullYear();
    // years[0] = eventInfo.year
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
        url: "http://localhost:5000/eventInfo/addEventInfo",
        data: eventInfoDated
    })
    .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setToastMessage(res.data);
          setShowToast(true)
          setTimeout(() => {window.location.reload();}, 1000)
          
        }
    }).catch((error) => {
        console.log(error.response.data.error)
        setToastMessage(error.response.data.error);
        setShowToast(true)
    })
}

//TO DO: replace with floating labels if have time
// TO DO: modal-ize
 return(<Container className="event-add">
 <Container className="event-add-form">=
    <Form>
        <Form.Group controlId="inputName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Name" value={eventInfo.name} onChange={onChangeName}/>
      </Form.Group>
      <Form.Group controlId="inputLocation">
        <Form.Label>Location:</Form.Label>
        <Form.Control type="text" placeholder="Location" value={eventInfo.location} onChange={onChangeLocation}/>
      </Form.Group>
      <Form.Group controlId="inputDate">
      <Form.Label>Year:</Form.Label>
      <Form.Select value={eventInfo.year} onChange={onChangeDateYear}>
      {getYearsOptions()}
    </Form.Select>
    <Form.Label>Month:</Form.Label>
    <Form.Select value={eventInfo.month} onChange={onChangeDateMonth}>
      {getMonthsOptions()}
    </Form.Select>
    <Form.Label>Day:</Form.Label>
    <Form.Select value={eventInfo.day} onChange={onChangeDateDate}>
      {getDatesOptions()}
    </Form.Select>
      </Form.Group>
      {/* <Form.Group controlId="inputDate">
        <Form.Label>Date:</Form.Label>
        <Form.Control type="text" placeholder="Date" value={eventInfo.date} onChange={onChangeDate}/>
      </Form.Group> */}
      <Form.Group controlId="inputTime">
        <Form.Label>Time:</Form.Label>
        <Form.Select value={eventInfo.hour} onChange={onChangeTimeHour}>
            {getHourOptions()}
        </Form.Select>
        <Form.Label>:</Form.Label>
        <Form.Select value={eventInfo.minute} onChange={onChangeTimeMinute}>
            {getMinutesOptions()}
        </Form.Select>
        <Form.Select value={eventInfo.period.value} onChange={onChangeTimePeriod}>
            {getPeriodOptions()}
        </Form.Select>
        {/* <Form.Control type="text" placeholder="Time" value={eventInfo.time} onChange={onChangeTime}/> */}
      </Form.Group>
      {/* <Form.Text>Birthday</Form.Text>
      <Row>
      <Form.Group controlId="inputBirthdayMonth">
        <Form.Label>Month</Form.Label>
        <Form.Control type="" placeholder="Email" value={eventInfo.email} onChange={onChangeEmail}/>
      </Form.Group>
      </Row> */}

      <Button type="submit" onClick={handleSubmit} className="m-3"variant="success" size="lg">Add Event</Button>
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
    </Container>
    )
}