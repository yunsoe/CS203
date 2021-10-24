import React, { Component,useState } from "react";
import { Button,InputGroup,Form,Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";


export default function Update() {
    const history = useHistory();

    const [date,setDate] = useState(new Date())

    const updateForm = (e) => {
        e.preventDefault();
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/swabTests/" + localStorage.getItem("swabId"), 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "authorization": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({
                    "actualSwabDate": date
                }),
            }
        ).then(function (response) {
            if (response.status === 200) {
                alert("Thank you for your submission.");
                history.push("/swabTestUserView");

            } else {
                alert("There was an error on our side, please try again later.");
            }
        });
    }

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
        <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
         <h3>Submit Swab Result</h3>

    <br/>
    <Form id="feedbackForm" onSubmit = {(e) => updateForm(e)}> 
    <Col>
    <Form.Label>Old Date: {localStorage.getItem("swabDate")}</Form.Label>
    </Col>
         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
         <Col>
         <Form.Label>Change date of swab to:</Form.Label>
         </Col>
         <Col>
         <DatePicker wrapperClassName="datePicker" className="form-control" selected={date} onChange = {(input) => setDate(input)}/>
         </Col>
         <Button variant="primary" type="submit" style={{marginBottom: 10}}>Submit Swab Result</Button>
        </Form.Group>
    </Form>
    </div>
    </div>
    );
}