import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";
import { Form, Button, FormGroup } from "react-bootstrap";

export default function ForgotPasswordForm() {
    const history = useHistory();

    const [state, setState] = useState({
        email: ""
    });

      
    const redirectToLogin = () => {
        history.push("/login");
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const resetPassword = (e) => {
        e.preventDefault();
        if (state.email === "") {
            alert("Please enter an email.");
        } else {
            fetch(
                API_BASE_URL + "users/" + state.email + "/resetPassword", 
                {
                    method: "PUT"
                }
            ).then(function (response) {
                console.log(response.json());
                if (response.status === 200) {
                    alert("We have sent you an email with your new password. You will now be redirected to the login page.");
                    redirectToLogin();
                } else if (response.status === 401) {
                    alert("The email you have entered is not registered with us. Please try again.");
                }
            });
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
                <h3>Forgot Password</h3>
                <p style={{fontSize: 11, color: "blue"}}>We will send you an email with your new password. <br/>Use the new password to login and change your password upon logging in.</p>
                <Form onSubmit = {(e) => resetPassword(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" onChange={handleChange} id="email" />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginBottom: 10}}>Reset Password</Button>
                </Form>
            </div>
        </div>
    );
}