import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
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
        fetch(
            API_BASE_URL + "users/" + state.email + "/resetPassword", 
            {
                method: "PUT"
            }
        ).then(function (response) {
            if (response.status === 200) {
                console.log("password resetted");
                alert("We have sent you an email with your new password.");
                redirectToLogin();
            } else if (response.status === 401) {
                alert("This email is not registered. Please try again.");
            }
        });
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 100}}>
            <div className="card col-4 login-card mt-2 hv-center" style={{padding: 20}}>
                <h3>Forgot Password</h3>
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