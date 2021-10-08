import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";

export default function FeedbackForm() {
    const history = useHistory();

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

    const submitFeedback = () => {
        if (state.title === "") {
            alert("Please enter a title.");
        } else if (state.details === "") {
            alert("Please enter the details of your feedback.");
        } else {
            if (state.title.length < 2 || state.title.length > 30) {
                alert("The title should be between 2 to 30 characters.");
            } else if (state.details.length < 10 || state.details.length > 500) {
                alert("The details of your feedback should be between 10 to 500 characters.");
            } else {
                fetch(
                    API_BASE_URL + "users/" + localStorage.getItem("email") + "/feedbacks", 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
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
                        console.log(response.json());
                        alert("There was an error on our side, please try again later.");
                    }
                });
            }
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
                <h3>Submit Feedback</h3>
                <form id="feedbackForm">
                    <div className="form-group text-left">
                    <label>Title
                        <div style={{fontSize: 11, color: "blue"}}>Minimum 2 characters and maximum 30 characters long.</div>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter feedback title"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group text-left">
                    <label>Details
                        <div style={{fontSize: 11, color: "blue"}}>Minimum 10 characters and maximum 500 characters long.</div>
                    </label>
                    <textarea
                        className="form-control"
                        id="details"
                        rows="5"
                        placeholder="Enter feedback details"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-check"></div>
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick = {(e) => submitFeedback()}
                    >
                    Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    )
}