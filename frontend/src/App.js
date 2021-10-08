import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavMenu from "./views/NavMenu";
import AuthContext from "./navigation/AuthContext";
import PrivateRoute from "./navigation/PrivateRoute";
import "./App.css";
import Authentication from "./views/Authentication";
import Home from "./views/Home";
import Logout from "./views/Logout";
import RegistrationForm from "./components/Registration/RegistrationForm";
import ForgotPasswordForm from "./components/ForgotPassword/ForgotPasswordForm";
import ChangePasswordForm from "./components/ChangePassword/ChangePasswordForm";

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("email") === null) {
      localStorage.setItem("email", this.state.email);
      localStorage.setItem("username", this.state.username);
    } else {
      if (localStorage.getItem("email").length !== 0) {
        this.state.email = localStorage.getItem("email");
        this.state.username = localStorage.getItem("username");
        this.state.isAuth = true;
      }
    }
  }
  state = {
    isAuth: false,
    email: "",
    username: "",
    updateAuth: (isAuth, email, username) => {
      this.setState(
        { isAuth: true, email: email, username: username },
        function () {
          localStorage.setItem("email", email);
          localStorage.setItem("username", username);
        }
      );
    },
    logout: () => {
      this.setState(
        { isAuth: false, email: "", role: "", username: "" },
        function () {
          localStorage.setItem("email", this.state.email);
          localStorage.setItem("username", this.state.username);
        }
      );
    },
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider value={this.state}>
          <PrivateRoute component={NavMenu} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return localStorage.getItem("email").length !== 0 ? (
                  <Redirect to="/home" />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />
            <Route path="/home" component={Home} />
            <Route path="/changePassword" component={ChangePasswordForm} />
            <Route path="/forgotPassword" component={ForgotPasswordForm} />
            <Route path="/login" component={Authentication} />
            <Route path="/register" component={RegistrationForm} />
            <PrivateRoute path="/logoutConfirm" component={Logout} />
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
}
