import React, {useState} from 'react';
import { API_BASE_URL } from "../../constants/apiConstants";
import { Form, Button, FormGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import "../Home/home.css";

export default function EventForm() {

    const [state , setState] = useState({
        event: "",
        eventDate : "",
        location: "",
        // users:""
    });

    const [date,setDate] = useState(new Date());
    const [selectedDate,setSelectedDate] = useState();

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    };

    const submitEvent = () => {
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/company",
            {
                method: "GET",
            }
        ).then(function (response) {
            response.json().then(function(companyId) {
                fetch(
                    API_BASE_URL + "users/" + localStorage.getItem("email") + "/companies/" + companyId + "/events",
                    {
                        method: "POST",
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
                    if (response.status === 201) {
                        setState((prevState) => ({
                            ...prevState
                        }));
                        alert("Your event has been successfully added.");
                        window.location.reload();
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

        state.eventDate = format(selectedDate, 'dd/MM/yyyy');

        submitEvent();
    }


    return (
        <div >
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom: 100}}>
            <div className="col-5 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 50, backgroundColor: 'white', borderRadius: 10}}>
                <h3>Add New Event</h3>
                <br/>
                <Form id="eventForm" onSubmit = {(e) => handleSubmitClick(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Event Name" onChange={handleChange} id="event" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date:</Form.Label>
                        <DatePicker required wrapperClassName="datePicker" selected={selectedDate} minDate={new Date(date.getFullYear(),date.getMonth(),date.getDate()+1)} dateFormat="dd/MM/yyyy" placeholderText="Select Date (DD/MM/YYYY)" className="form-control" onChange = {(input) => setSelectedDate(input)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Location" onChange={handleChange} id="location" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" style={{marginBottom: 10}}>Add Event</Button>
                </Form>
            </div>
        </div>
    </div>
    )
}