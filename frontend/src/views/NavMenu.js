import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown } from 'react-bootstrap'

export default function NavMenu() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" >
      <Navbar.Brand href="/"></Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        {
          localStorage.getItem("authority") === "ROLE_ADMIN" ? 
          <NavDropdown title="Admin" id="admin-nav-dropdown">
            <NavDropdown.Item href="/createUser">Create User</NavDropdown.Item>
            <NavDropdown.Item href="/deleteUser">Delete User</NavDropdown.Item>
          </NavDropdown> :
          console.log("")
        }
        <Nav.Link href="/changePassword">Change Password</Nav.Link>
        <Nav.Link href="/feedback">Feedback</Nav.Link>
        <NavDropdown title="SwabTest" id="swabTest-nav-dropdown">
            <NavDropdown.Item href="/swabTestForm">swabTestForm</NavDropdown.Item>
            <NavDropdown.Item href="/swabTestHistory">view swabTest history</NavDropdown.Item>
          </NavDropdown>
        <Nav.Link href="/logoutConfirm">Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
}
