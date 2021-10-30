import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown } from 'react-bootstrap';


export default function NavMenu() {

  return (
    <Navbar bg="dark" variant="dark" sticky="top" >
      <Navbar.Brand href="/"></Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/regulations">Covid Regulations</Nav.Link>
        <Nav.Link href="/news">Top-Headlines</Nav.Link>

        {
          localStorage.getItem("authority") === "ROLE_ADMIN" ? 
          <NavDropdown title="Admin" id="admin-nav-dropdown">
            <NavDropdown.Item href="/addEmployee">Add Employee</NavDropdown.Item>
            <NavDropdown.Item href="/removeEmployee">Remove Employee</NavDropdown.Item>
          </NavDropdown> :
          console.log("")
        }
        {localStorage.getItem("authority") === "ROLE_ADMIN" || localStorage.getItem("authority") === "ROLE_USER"? 
        <><Nav.Link href="/changePassword">Change Password</Nav.Link>
        <Nav.Link href="/feedback">Feedback</Nav.Link>
        <NavDropdown title="Events" id="events-nav-dropdown">
            <NavDropdown.Item href="/eventForm">Event Form</NavDropdown.Item>
            <NavDropdown.Item href="/viewEvents">View Events</NavDropdown.Item>
            <NavDropdown.Item href="/viewOtherCompanyEvents">View Other Company Events</NavDropdown.Item>

          </NavDropdown>
          
          <NavDropdown title="Swab Test" id="swabTest-nav-dropdown">
          <NavDropdown.Item href="/swabTestForm">Swab Test Form</NavDropdown.Item>
          {localStorage.getItem("authority") === "ROLE_ADMIN"? <NavDropdown.Item href="/swabTestHistory">View Swab Test History</NavDropdown.Item>:
          <NavDropdown.Item href="/swabTestUserView">View Individual Swab Test</NavDropdown.Item>  
          }
        </NavDropdown>
        <NavDropdown title="Swab Test Alert" id="SwabTestDetail-nav-dropdown">
            <NavDropdown.Item href="/swabTestDetailForm">Add Swab Test Alert</NavDropdown.Item>
            <NavDropdown.Item href="/swabTestDetail">View Swab Test alerts</NavDropdown.Item>
          </NavDropdown>
        </>
        : <Nav.Link href="/viewFeedbacks">View Feedbacks</Nav.Link>
        }
        
        <Nav.Link href="/logoutConfirm">Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
}
