import React, { Component,useState } from "react";
import { Button,InputGroup,Form,Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import { API_BASE_URL } from "../../constants/apiConstants";
import {useHistory} from "react-router-dom";
import moment from 'moment';

export default function SwabTestForm() {

    const history = useHistory();

    const [date,setDate] = useState(new Date())
    const [state, setState] = useState("");
    const today = moment();

 

    const handleChange = (event) =>
    setState(event);

    const redirectToSwabTestUserView = () => {
        history.push("/swabTestUserView");
    };
   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state)

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
                redirectToSwabTestUserView();
            } else {
                alert("There was an error on our side, please try again later.");
            }
        });
    }
    

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom:100}}>
            <div className="col-5 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 40, backgroundColor: 'white', borderRadius: 10}}>
             <h3>Submit Swab Result</h3>
        <br/>
        <Form id="Form" onSubmit = {(e) => handleSubmit(e)}> 
            <Col>
                <Form.Label>Swab Result:</Form.Label>
            </Col>
            <Col>
                <select value={state} onChange={(e) => handleChange(e.target.value)} >
                    <option  value="false">Negative</option> 
                    <option value="true">Positive</option>
                </select>
            </Col>
            <p></p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Col>
                    <Form.Label>Date of Swab Test:</Form.Label>
                </Col>
                <Col>
                    <DatePicker wrapperClassName="datePicker" className="form-control" selected={date} maxDate={moment().toDate()} onChange = {(input) => setDate(input)}/>
                </Col>
                <p></p>
                <Col><Button variant="primary" type="submit" style={{marginBottom: 10}}>Submit Swab Result</Button></Col>
            </Form.Group>
        </Form>
        </div>
        </div>
    );
}