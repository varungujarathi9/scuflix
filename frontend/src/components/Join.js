import React, { Component } from "react";
import UserApiService from "../apis/UserApiService";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }
  JoinUser = () => {
    let user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    };
    UserApiService.joinUser(user)
      .then((res) => {
        if (res.data === 0) {
          alert("Membership failed! same ID exists");
        } else {
          let userid = res.data;
          alert("Membership successful");
          sessionStorage.setItem("user", userid);
          window.location.href = "http://localhost:3000";
        }
      })
  };

  joinInfoHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div style={{ flex: 1 }}>
        <div
          className="container"
          style={{
            justifyItems: "center",
            alignItems: "center",
            width: "500px",
            marginTop: "18vh",
          }}
        >
          <div className="row">
            <div className="col">
              <div style={{ margin: 20 }}>
                <p style={{ fontWeight: "bold", fontSize: 18, color: "white", textAlign:"center" }}>
                SignUp Now!
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
            <input
                name="name"
                placeholder="Username"
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={(e) => this.joinInfoHandler(e)}
                style={{ margin: 20 }}
              />

              <input
                name="email"
                placeholder="Email Address"
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={(e) => this.joinInfoHandler(e)}
                style={{ margin: 20 }}
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={(e) => this.joinInfoHandler(e)}
                style={{ margin: 20 }}
              />

              <button
                type="button"
                onClick={() => this.JoinUser()}
                className="btn btn-block"
                style={{
                  margin: 20,
                  backgroundColor: "yellow",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                SIGN UP
              </button>
              <a href="/login" style={{ color: "white", fontWeight: "bold" }}>Already have an account? Login</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Join;
