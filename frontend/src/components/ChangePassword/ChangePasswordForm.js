import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";
import { Form, Button, FormGroup } from "react-bootstrap";

export default function ChangePasswordForm() {
    const history = useHistory();

    const [state, setState] = useState({
        currentPassword: "",
        newPassword: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const redirectToHome = () => {
        history.push("/home");
    };

    const changePassword = (e) => {
        e.preventDefault();
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/changePassword", 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "currentPassword": state.currentPassword,
                    "newPassword": state.newPassword
                }),
            }
        ).then(function (response) {
            console.log(response.status);
            if (response.status === 200) {
                alert("Your password has been updated successfully. You will now be redirected back to the home page.");
                redirectToHome();
            } else if (response.status === 401) {
                alert("Your current password is wrong. Please try again.");
            }
        }
        );
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
                <h3>Change Password</h3>
                <br/>
                <Form onSubmit = {(e) => changePassword(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Current Password:</Form.Label>
                        <Form.Control required type="password" placeholder="Enter current password" onChange={handleChange} id="currentPassword" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control required minLength={8} type="password" placeholder="Enter new password" onChange={handleChange} id="newPassword" />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginBottom: 10}}>Change Password</Button>
                </Form>
            </div>
        </div>
    );
}