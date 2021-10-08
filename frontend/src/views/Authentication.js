import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import RegistrationForm from "../components/Registration/RegistrationForm";

export default function Authentication() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <div
      style={{
        backgroundColor: "#3094ff",
        height: "100vh",
        display: "flex",
        alignItems: "center",
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
