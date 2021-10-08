import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";

export default function ForgotPasswordForm() {
    const history = useHistory();

    const [state, setState] = useState({
        email: ""
      });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const redirectToLogin = () => {
        history.push("/login");
    };

    const resetPassword = () => {
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
                    alert("We have sent you an email with your new password. You will now be redirected back to the login page.");
                    redirectToLogin();
                } else if (response.status === 401) {
                    alert("You have entered an invalid email. Please try again.");
                }
            });
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
                <h3>Forgot Password</h3>
                <p style={{fontSize: 11, color: "blue"}}>We will send you an email with your new password. <br/>Use the new password to login and change your password upon logging in.</p>
                <form>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-check"></div>
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick = {(e) => resetPassword()}
                    >
                    Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}