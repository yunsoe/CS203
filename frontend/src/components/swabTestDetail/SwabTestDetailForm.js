import React, { Component,useState } from "react";
import { Button,InputGroup,Form,Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import { API_BASE_URL } from "../../constants/apiConstants";

export default function SwabTestDetailForm() {

    const [time,setTime] = useState("");
    const [state, setState] = useState("");
    const [msg,setMessage] = useState("");

      

    const handleChange = (event) =>
    setState(event);

   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state)

        fetch(
            API_BASE_URL + "swabTestDetails/" + localStorage.getItem("email"), 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "authorization": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({
                    "alert_day": state,
                    //"alert_time": time,
                    //"message" : msg,
                }),
            }
        ).then(function (response) {
            if (response.status === 201) {
                alert("Submission successful.");
            } else {
                alert("There was an error on our side, please try again later.");
            }
        });
    }
    

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
             <h3>Submit Swab Result</h3>

        <br/>
        <Form id="Form" onSubmit = {(e) => handleSubmit(e)}> 
        <Col>
        <Form.Label>swab Result:</Form.Label>
        </Col>
         <Col>
        <select value={state} onChange={(e) => handleChange(e.target.value)} >
            <option  value="monday">Mon</option> 
            <option value="tuesday">Tue</option>
            <option value="wednesday">Wed</option>
            <option value="thursday">Thurs</option>
            <option value="friday">Friday</option>
            <option value="saturday">Sat</option>
            <option value="sunday">Sun</option>
        </select>
        </Col>
             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            
             <Form.Group className="mb-3">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control required minLength={2} maxLength={30} type="text" placeholder="HH:MM" onChange= {(input) => setTime(input)} id="timeInput" />
                        </Form.Group>
             <Form.Group className="mb-3">
                    <Form.Label>Details:</Form.Label>
                            <Form.Control required as="textarea" rows={5} minLength={10} maxLength={500} type="text" placeholder="Enter message details" onChange={(input) => setMessage(input)} id="details" />
                </Form.Group>
             <Button variant="primary" type="submit" style={{marginBottom: 10}}>Submit Swab Result</Button>
            </Form.Group>
        </Form>
        </div>
        </div>
    );
}