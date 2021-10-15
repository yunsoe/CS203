import React, { Component,useState } from "react";
import { Button,InputGroup,Form,Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import { API_BASE_URL } from "../../constants/apiConstants";

export default function SwabTestForm() {

    const [date,setDate] = useState(new Date())
    const [state, setState] = useState('positive');
      

    const handleChange = (event) =>
    setState(event);

   

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/swabTests", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "authorization": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({
                    "swabResult": state,
                    "actualSwabDate": format(date, 'yyyy-MM-dd')
                }),
            }
        ).then(function (response) {
            if (response.status === 201) {
                alert("Submission successful.");
                //document.getElementById("feedbackForm").reset();
            } else {
                alert("There was an error on our side, please try again later.");
            }
        });
    }
    

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
        <br/>
        <Form id="feedbackForm" onSubmit = {(e) => handleSubmit(e)}> 
        <Col>
        <Form.Label>swab Result:</Form.Label>
        </Col>
         <Col>
        <select value={state} onChange={(e) => handleChange(e.target.value)} > 
            <option value="true">positive</option>
            <option  value="false">negative</option>
        </select>
        </Col>
             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
             <Col>
             <Form.Label>date of swab:</Form.Label>
             </Col>
             <Col>
             <DatePicker wrapperClassName="datePicker" className="form-control" selected={date} onChange = {(input) => setDate(input)}/>
             </Col>
             <Button variant="primary" type="submit" style={{marginBottom: 10}}>Submit Swab Result</Button>
            </Form.Group>
        </Form>
        </div>
    );
}