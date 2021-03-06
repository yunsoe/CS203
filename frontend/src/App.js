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
import FeedbackForm from "./components/Feedback/FeedbackForm";
import AddEmployeeForm from "./components/Admin/AddEmployeeForm";
import RemoveEmployeeForm from "./components/Admin/RemoveEmployeeForm";
import "./components/Home/home.css"
import EventForm from "./components/Events/EventForm";
import ViewEvents from "./components/Events/ViewEvents";
import UpdateEvent from "./components/Events/UpdateEvent";
import ViewAttendees from "./components/Events/ViewAttendees";
import ViewOtherCompanyEvents from "./components/Events/ViewOtherCompanyEvents";
import CheckEventStatus from "./components/Events/CheckEventStatus";
import CheckLocationStatus from "./components/Events/CheckLocationStatus";
// import ViewCovidEvents from "./components/Events/ViewCovidEvents";
import ViewEventHistory from "./components/Events/ViewEventHistory";
import SwabTestForm from "./components/swabTest/SwabTestForm";
import SwabTestHistory from "./components/swabTest/SwabTestHistory";
import SwabTestUserView from "./components/swabTest/SwabTestUserView";
import ViewFeedbacks from "./components/Feedback/ViewFeedbacks";
import Update from "./components/swabTest/Update";
import UpdateSwabTestDetail from "./components/swabTestDetail/UpdateSwabTestDetail";
import News from "./views/News";
import Regulations from "./views/Regulations";
import SwabTestDetailForm from "./components/swabTestDetail/SwabTestDetailForm";
import SwabTestDetail from "./components/swabTestDetail/SwabTestDetail";

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("email") === null) {
      localStorage.setItem("email", this.state.email);
      localStorage.setItem("authority", this.state.authority);
      localStorage.setItem("accessToken", this.state.accessToken);
    } else {
      if (localStorage.getItem("email").length !== 0) {
        this.state.email = localStorage.getItem("email");
        this.state.authority = localStorage.getItem("authority");
        this.state.accessToken = localStorage.getItem("accessToken");
        this.state.isAuth = true;
      }
    }
  }
  state = {
    isAuth: false,
    email: "",
    username: "",
    authority: "",
    accessToken: "",
    updateAuth: (isAuth, email, authority, accessToken) => {
      this.setState(
        { isAuth: true, email: email, authority: authority, accessToken: accessToken },
        function () {
          localStorage.setItem("email", email);
          localStorage.setItem("authority", authority);
          localStorage.setItem("accessToken", accessToken);
        }
      );
    },
    logout: () => {
      this.setState(
        { isAuth: false, email: "", authority: "", accessToken: "" },
        function () {
          localStorage.setItem("email", this.state.email);
          localStorage.setItem("authority", "");
          localStorage.setItem("accessToken", "");
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
            <Route path="/feedback" component={FeedbackForm} />
            <Route path="/eventForm" component={EventForm} />
            <Route path="/viewEvents" component={ViewEvents} />
            <Route path="/viewOtherCompanyEvents" component={ViewOtherCompanyEvents} />
            <Route path="/checkEventStatus" component={CheckEventStatus} />
            <Route path="/checkLocationStatus" component={CheckLocationStatus} />
            {/* <Route path="/viewCovidEvents" component={ViewCovidEvents} /> */}
            <Route path="/updateEvent" component={UpdateEvent} />
            <Route path="/viewAttendees" component={ViewAttendees} />
            <Route path="/viewEventHistory" component={ViewEventHistory} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/removeEmployee" component={RemoveEmployeeForm} />
            <Route path="/addEmployee" component={AddEmployeeForm} />
            <Route path="/swabTestForm" component={SwabTestForm} />
            <Route path="/swabTestHistory" component={SwabTestHistory} /> 
            <Route path="/swabTestUserView" component={SwabTestUserView} /> 
            <Route path="/swabTestDetailForm" component={SwabTestDetailForm} /> 
            <Route path="/swabTestDetail" component={SwabTestDetail} />             
            <Route path="/update" component={Update} />
            <Route path="/updateSwabTestDetail" component={UpdateSwabTestDetail} />            
            <Route path="/viewFeedbacks" component={ViewFeedbacks} /> 
            <Route path="/news" component={News} />
            <Route path="/regulations" component={Regulations} />
            <PrivateRoute path="/logoutConfirm" component={Logout} />
          </Switch>
        </AuthProvider>
      </Router>
    );
  }
}
