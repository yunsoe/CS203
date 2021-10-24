import React, { Component,useState } from "react";
import { Button,InputGroup,Form,Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";


export default function updateSwabTestDetail() {
    const history = useHistory();


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


    const updateForm = (e) => {
        e.preventDefault();
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/swabTestDetails/" + localStorage.getItem("swabDetailId"), 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "authorization": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({
                    "alertDay": "hgh",
                    "alertTime": state.time,
                    "message": state.message
                }),
            }
        ).then(function (response) {
            if (response.status === 200) {
                alert("Thank you for your Submission.");
                history.push("/swabTestDetail");

            } else {
                alert("There was an error on our side, please try again later.");
            }
        });
    }

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
        <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
         <h3>New Swab Alert Information:</h3>

    <br/>
    <Form id="Form" onSubmit = {(e) => updateForm(e)}> 
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