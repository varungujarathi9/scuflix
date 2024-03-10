import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import UserApiService from "../apis/UserApiService";
import "../styles/Login.css";

function Login({ authenticated, location }) {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleLoginOk = async () => {
    console.log(email);
    console.log(passWord);
    if (email === "") {
      alert("Enter your email!");
      return;
    } else if (passWord === "") {
      alert("Please enter a password!");
      return;
    }
    let user = {
      email: email,
      passWord: passWord,
    };
    login(user);
  };

  const login = (user) => {
    console.log("User information entered", user);
    UserApiService.loginOk(user)
      .then((res) => {
        let userid = res.data;
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", userid);
        alert("Login Successful!");
        window.location.href = "http://localhost:3000";
      })
      .catch((err) => {
        alert("Email or password does not match. \nPlease enter it again!");
        setEmail("");
        setPassWord("");
      });
  };

  const { from } = location.state || { from: { pathname: "/" } };
  if (authenticated) return <Redirect to={from} />;

  return (
    <div className="outer">
      <div className="inner">
        <h3 style={{ color: "white" }}>Welcome</h3>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            name="email"
            id="email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </div>

        <div className="form-group">
          <input
            type="passWord"
            className="form-control"
            placeholder="Password"
            name="passWord"
            id="passWord"
            value={passWord}
            onChange={({ target: { value } }) => setPassWord(value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-block"
          style={{ backgroundColor: "yellow", color: "black" }}
          onClick={handleLoginOk}
        >
          LOGIN
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>

        <p className="signup-text" style={{ color: "gray", textAlign: "center" }}>
           Not a member?{' '}
          <a href="/join" style={{ color: "white", fontWeight: "bold" }}>
            Sign up now
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;
