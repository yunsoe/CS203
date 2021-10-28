import React, {useState} from 'react';
import { API_BASE_URL } from "../../constants/apiConstants";
import { Form, Button, FormGroup } from "react-bootstrap";

export default function EventForm() {

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

    const submitEvent = (e) => {
        e.preventDefault();
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
                        document.getElementById("eventForm").reset();
                        alert("Your event has been successfully added.");
                    } else {
                        console.log(response.json);
                        alert("There was an error on our side, please try again later.");
                    }
                });
            });
        });
    }

    // function getSelectValues(select) {
    //     var result = [];
    //     var options = select && select.options;
    //     var opt;
      
    //     for (var i=0, iLen=options.length; i<iLen; i++) {
    //       opt = options[i];
      
    //       if (opt.selected) {
    //         result.push(opt.value || opt.text);
    //       }
    //     }
    //     return result;
    //   }


    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom: 100}}>
            <div className="col-5 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 50, backgroundColor: 'white', borderRadius: 10}}>
                <h3>Add New Event</h3>
                <br/>
                <Form id="eventForm" onSubmit = {(e) => submitEvent(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Event Name" onChange={handleChange} id="event" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Date" onChange={handleChange} id="eventDate" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter Location" onChange={handleChange} id="location" />
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                        <Form.Label>Users:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Add Users" onChange={handleChange} id="users" />
                    </Form.Group> */}
                    {/* <select multiple>
                        <option>opt 1 text</option>
                        <option value="opt 2 value">opt 2 text</option>
                        </select>
                        <button onclick="
                        var el = document.getElementsByTagName('select')[0];
                        alert(getSelectValues(el));
                        "></button> */}
                    
                    <Button variant="primary" type="submit" style={{marginBottom: 10}}>Add Event</Button>
                </Form>
            </div>
        </div>
    )
}