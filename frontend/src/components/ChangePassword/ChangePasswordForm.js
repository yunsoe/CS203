import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";

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

    const changePassword = () => {
        if (state.currentPassword === "") {
            alert("Please enter your current password.");
        } else if (state.newPassword === "") {
            alert("Please enter your new password.");
        } else {
            if (state.newPassword.length < 8) {
                alert("Your new password has to be at least 8 characters long.");
            } else {
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
                    if (response.status === 200) {
                        alert("Your password has been updated successfully. You will now be redirected back to the home page.");
                        redirectToHome();
                    } else if (response.status === 401) {
                        alert("Your current password is wrong. Please try again.");
                    }
                });
            }
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-5 login-card mt-2 hv-center" style={{padding: 20}}>
                <h3>Change Password</h3>
                <form>
                    <div className="form-group text-left">
                    <label>Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        placeholder="Enter current password"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-group text-left">
                    <label>New Password
                        <div style={{fontSize: 11, color: "blue"}}>At least 8 characters long.</div>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        placeholder="Enter new password"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="form-check"></div>
                    <button
                    type="button"
                    className="btn btn-primary"
                    onClick = {(e) => changePassword()}
                    >
                    Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}