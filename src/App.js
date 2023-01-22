import './App.css';

import { Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage'
import InvitationListList from './components/InvitationListList';
import EventList from './components/EventList';
import ContactList from './components/ContactList';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container  from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <Navbar bg="warning" variant="light">
        <Container>
        <Navbar.Brand href="\">In-Voi-tations</Navbar.Brand>

        <Nav className='justify-content-center'>
        <Nav.Item>
          <Nav.Link href='/invite'>Send Invitations</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/friends'>Friends</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/events'>Events</Nav.Link>
        </Nav.Item>
      </Nav>
      </Container>
      </Navbar>
     <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/invite' element={<InvitationListList/>}/>
      <Route path='/friends' element={<ContactList/>}/>
      <Route path='/events' element={<EventList/>}/>
      {/* <Route path='/settings' element={<InvitationList/>}/> */}

     </Routes>
    </div>
  );
}

export default App;
