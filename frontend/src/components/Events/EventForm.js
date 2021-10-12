import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { Form, Button, FormGroup } from "react-bootstrap";

export default function EventForm() {

    const [state, setState] = useState({
        title: "",
        details: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const addEvent = (e) => {
        e.preventDefault();
        fetch(
            API_BASE_URL + "companies/" + localStorage.getItem("companyId") + "/events", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "authorization": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({
                    "Name": state.event,
                    "Date": state.eventDate,
                    "Location": state.location,

                }),
            }
        ).then(function (response) {
            if (response.status === 201) {
                alert("Your event has been successfully added to the event log.");
                document.getElementById("EventForm").reset();
            } else {
                alert("There was an error on our side, please try again later.");
            }
        });
    }

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
                <h3>Add New Event</h3>
                <br/>
                <Form id="eventForm" onSubmit = {(e) => addEvent(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Event Name" onChange={handleChange} id="name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Date" onChange={handleChange} id="name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Location" onChange={handleChange} id="name" />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginBottom: 10}}>Add Event</Button>
                </Form>
            </div>
        </div>
    )
}