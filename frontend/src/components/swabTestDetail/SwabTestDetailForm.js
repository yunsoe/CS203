import React, { Component,useState } from "react";
import { Button,InputGroup,Form,Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import { API_BASE_URL } from "../../constants/apiConstants";

export default function SwabTestDetailForm() {

    // const [time,setTime] = useState("");
     const [date, setDate] = useState("MON");
    // const [msg,setMessage] = useState("");
    const [state, setState] = useState({
        
        time: "",
        message : ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
      

    const handleChange2 = (event) =>
    setDate(event);

   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(date)

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
                    "alertDay": date,
                    "alertTime": state.time,
                    "message" : state.message,
                }),
            }
        ).then(function (response) {
            if (response.status === 200) {
                alert("Submission successful.");
            } else {
                alert("There was an error on our side, please try again later.");
            }
        });
    }
    

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom:100}}>
            <div className="col-5 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 40, backgroundColor: 'white', borderRadius: 10}}>
             <h3>Submit Swab Test Alert Details</h3>

        <br/>
        <Form id="Form" onSubmit = {(e) => handleSubmit(e)}> 
        <Col>
        <Form.Label>Date:</Form.Label>
        </Col>
         <Col>
        <select value={date} onChange={(e) => handleChange2(e.target.value)}  >
            <option  value="MON">Mon</option> 
            <option value="TUE">Tue</option>
            <option value="WED">Wed</option>
            <option value="THURS">Thurs</option>
            <option value="FRI">Friday</option>
            <option value="SAT">Sat</option>
            <option value="SUN">Sun</option>
        </select>
        </Col>
             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            
             <Form.Group className="mb-3">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control required minLength={2} maxLength={30} type="text" placeholder="HH:MM" onChange= {handleChange} id="time" />
                        </Form.Group>
             <Form.Group className="mb-3">
                    <Form.Label>Details:</Form.Label>
                            <Form.Control required as="textarea" rows={5} minLength={10} maxLength={500} type="text" placeholder="Enter message details" onChange={handleChange} id="message" />
                </Form.Group>
             <Button variant="primary" type="submit" style={{marginBottom: 10}}>Submit</Button>
            </Form.Group>
        </Form>
        </div>
        </div>
    );
}