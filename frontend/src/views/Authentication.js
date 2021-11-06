import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import RegistrationForm from "../components/Registration/RegistrationForm";
import "./View.css";

export default function Authentication() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <div id = 'login'
      style={{
        // backgroundColor: "red",
        height: "100vh",
        display: "flex",
        // alignItems: "center",
        paddingTop: "150px",
        paddingBottom: "325px",
        justifyContent: "center",
      }}
    >
      {isLoginForm ? (
        <LoginForm setIsLoginForm={setIsLoginForm} />
      ) : (
        <RegistrationForm setIsLoginForm={setIsLoginForm} />
      )}
    </div>
  );
}
