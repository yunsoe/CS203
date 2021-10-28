import React, {useState} from 'react';
import { API_BASE_URL } from "../../constants/apiConstants";
import { Form, Button } from "react-bootstrap";

import { useHistory} from "react-router-dom";

export default function UpdateEvent() {

    const history = useHistory();

    const [state , setState] = useState({
        event: "",
        eventDate : "",
        location: "",
        // users:""
    });

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    };

    const updateForm = () => {
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/company",
            {
                method: "GET",
            }
        ).then(function (response) {
            response.json().then(function(companyId) {
                fetch(
                    API_BASE_URL + "companies/" + companyId + "/events/" + localStorage.getItem("eventId"),
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "authorization": localStorage.getItem("accessToken"),
                        },
                        body: JSON.stringify({
                            "event": state.event,
                            "eventDate": state.eventDate,
                            "location": state.location,
                            // "users":state.users,
                        }),
                    }
                ).then(function (response) {
                    if (response.status === 200) {
                        setState((prevState) => ({
                            ...prevState
                        }));
                        alert("Your event has been successfully edited.");
                        history.push("/ViewEvents");
                    } else {
                        console.log(response.json);
                        alert("There was an error on our side, please try again later.");
                    }
                });
            });
        });
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        
        var today = new Date();
        const dateEvent = state.eventDate.split("/");
        var dateOfEvent = new Date(dateEvent[2] + "-" + dateEvent[1] + "-" + dateEvent[0]);
        var isAfterToday = (dateOfEvent > today);

        if(isAfterToday) {
            updateForm();   
        } else {
            alert('Please enter a date after today.');
        }
    }



    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom: 100}}>
            <div className="col-5 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 50, backgroundColor: 'white', borderRadius: 10}}>
                <h3>Edit Event</h3>
                <br/>
                <Form id="eventForm" onSubmit = {(e) => handleSubmitClick(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Event Name" onChange={handleChange} id="event" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date:</Form.Label>
                        <Form.Control required placeholder="DD/MM/YYYY" pattern="^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))" minLength={2} maxLength={30} type="text" onChange={handleChange} id="eventDate"  />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Location" onChange={handleChange} id="location" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" style={{marginBottom: 10}}>Edit Event</Button>
                </Form>
            </div>
        </div>
    )
}