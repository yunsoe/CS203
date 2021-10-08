import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default function NavMenu() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" >
      <Navbar.Brand href="/"></Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/changePassword">Change Password</Nav.Link>
        <Nav.Link href="/logoutConfirm">Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
}
