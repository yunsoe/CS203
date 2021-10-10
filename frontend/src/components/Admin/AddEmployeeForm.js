import React, {useState} from 'react';
import { API_BASE_URL } from "../../constants/apiConstants";
import { Form, Button, FormGroup } from "react-bootstrap";

export default function AddEmployeeForm() {

    const [state , setState] = useState({
        email : "",
        name: "",
        password : "",
        confirmPassword: "",
        role: ""
    });

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    };

    const sendDetailsToServer = () => {
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/company",
            {
                method: "GET",
            }
        ).then(function (response) {
            response.json().then(function(companyId) {
                fetch(
                    API_BASE_URL + "users/" + companyId,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "authorization": localStorage.getItem("accessToken"),
                        },
                        body: JSON.stringify({
                            "email": state.email,
                            "name": state.name,
                            "password": state.password,
                            "role": state.role,
                            "authorities": "ROLE_USER"
                        }),
                    }
                ).then(function (response) {
                    if (response.status === 201) {
                        setState((prevState) => ({
                            ...prevState
                        }));
                        document.getElementById("newEmployeeForm").reset();
                        alert("Employee account has been successfully created.");
                    } else if (response.status == 409) {
                        alert("This email is already registered, please try again.");
                    } else {
                        console.log(response.json);
                        alert("There was an error on our side, please try again later.");
                    }
                });
            });
        });
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        console.log(state.email);
        if(state.password === state.confirmPassword) {
            sendDetailsToServer();   
        } else {
            alert('Passwords do not match');
        }
    }

    function renderPage() {
        if (localStorage.getItem("authority") !== "ROLE_ADMIN") {
            return(
                <div style={{textAlign: "center"}}>You are not authorized to enter this page.</div>
            );
        } else {
            return(
                <div>
                    <h3>Employee Registration</h3>
                    <br />
                    <Form id="newEmployeeForm" onSubmit={(e) =>  handleSubmitClick(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" onChange={handleChange} id="email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control required minLength={5} maxLength={30} type="text" placeholder="Enter your name" onChange={handleChange} id="name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control required minLength={8} type="password" placeholder="Enter your password" onChange={handleChange} id="password" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control required minLength={8} type="password" placeholder="Enter your password again" onChange={handleChange} id="confirmPassword"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Role:</Form.Label>
                            <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter your role" onChange={handleChange} id="role" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            );
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center" style={{padding:20}}>
                {renderPage()}
            </div>
        </div>
    )
}