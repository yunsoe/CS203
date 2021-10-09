import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default function Home() {
    const redirectToDeleteUser = () => {
        window.location.replace("http://localhost:3000/deleteUser");
    };

    const redirectToCreateUser = () => {
        window.location.replace("http://localhost:3000/createUser");
    };

    return(
        <div>
        <div>home page</div>
        <div style={{padding: 20}}>
        {localStorage.getItem("authority") === "ROLE_ADMIN" ? 
        <div>
            Admin Features
            <p></p>
            <Button onClick={redirectToDeleteUser}>Delete User</Button>
            <Button onClick={redirectToCreateUser} style={{marginLeft: 10}}>Create User</Button>
        </div> 
        : console.log("ROLE_USER")}
        </div>
        </div>
    );
}