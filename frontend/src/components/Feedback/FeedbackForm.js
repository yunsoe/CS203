import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { Form, Button, FormGroup } from "react-bootstrap";

export default function FeedbackForm() {

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

    const submitFeedback = (e) => {
        e.preventDefault();
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/feedbacks", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "authorization": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({
                    "title": state.title,
                    "details": state.details
                }),
            }
        ).then(function (response) {
            if (response.status === 201) {
                alert("Thank you for your feedback.");
                document.getElementById("feedbackForm").reset();
            } else {
                alert("There was an error on our side, please try again later.");
            }
        });
    }

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
                <h3>Submit Feedback</h3>
                <br/>
                <Form id="feedbackForm" onSubmit = {(e) => submitFeedback(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter feedback title" onChange={handleChange} id="title" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Details:</Form.Label>
                        <Form.Control required as="textarea" rows={5} minLength={10} maxLength={500} type="text" placeholder="Enter feedback details" onChange={handleChange} id="details" />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginBottom: 10}}>Submit Feedback</Button>
                </Form>
            </div>
        </div>
    )
}