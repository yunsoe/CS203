import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";
import AuthContext from "../../navigation/AuthContext";

export default function LoginForm(props) {
  const history = useHistory();

  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e, updateAuth) => {
    e.preventDefault();
    console.log(state.email + " " + state.password);
    axios
      .post(
        API_BASE_URL + "users/login/" + state.email + "/" + state.password
      )
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          updateAuth(true, state.email, state.username);
          redirectToHome();
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
            if (error.response.status === 401) {
                alert("Wrong email or password");
            }
        } else{
            alert("An error occurred. (Please check if the server is running)")
        }
      });
  };

  const redirectToHome = () => {
    history.push("/home");
  };

  const redirectToRegister = () => {
    history.push("/register")
    props.setIsLoginForm(false);
  };

  const redirectToForgotPassword = () => {
    history.push("/forgotPassword")
    props.setIsLoginForm(false);
  };

  return (
    <div className="card col-4 login-card mt-2 hv-center" style={{padding: 20}}>
      <h3>Login</h3>
      <br />
      <AuthContext.Consumer>
        {({ updateAuth }) => (
          <form>
            <div className="form-group text-left">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={state.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group text-left">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-check"></div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleSubmitClick(e, updateAuth)}
            >
              Login
            </button>
            <button
              style={{marginLeft: 10}}
              className="btn btn-primary"
              onClick={() => redirectToForgotPassword()}
            >
              Forgot Password
            </button>
          </form>
        )}
      </AuthContext.Consumer>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <p></p>
      <div className="registerMessage">
        <span>Is your company not registered yet? Register here now.</span>
        <div style={{paddingBottom: 10}}/> 
        <button
              className="btn btn-primary"
              onClick={() => redirectToRegister()}
            >
              Register
        </button>
      </div>
    </div>
  );
}