import React, { Component } from "react";
import UserApiService from "../apis/UserApiService";
import SearchBar from "../components/SearchBar";
import "../styles/App.css";

class MainNavbar extends Component {
  onLogout = () => {
    UserApiService.logoutOK()
      .then((res) => {
        let status = res.status;
        if (status === 200) {
          alert("Logout done!");
          sessionStorage.removeItem("user");
          window.location.href = "http://localhost:3000";
        }
      })
      .catch((err) => {
        console.error("UserApiService error : ", err);
        alert("Logout error \nPlease try again");
      });
  };
  render() {
    return (
      <div className="mainNavbar">
        <nav className="navbar">
          <ul className="nav justify-content-start">
            <a
              className="navbar-brand"
              href="/"
              style={{ color: "yellow", fontFamily: "monospace", fontSize: 25, fontWeight: 'bold'}}
            >
              SCUFLIX
            </a>

            <li className="nav-item">
              <a className="nav-link" href="/" style={{ color: "white", fontWeight: 'bold'}}>
              Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movie" style={{ color: "white", fontWeight: 'bold' }}>
              Movie
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/newContent"
                style={{ color: "white", fontWeight: 'bold' }}
              >
                Trending
              </a>
            </li>
            <li className="nav-item">
              {(sessionStorage.getItem('user') !== null) ?
              <a
                className="nav-link"
                href="/myContent"
                style={{ color: "white" }}
              >
                Wishlist
              </a>
              : ''
              } 
            </li>
          </ul>
          <ul className="nav justify-content-end">
            <li>
              <SearchBar />
            </li>
            <li className="nav-item">
              <div>
                {sessionStorage.getItem("user") == null ? (
                  <a
                    className="nav-link"
                    href="/login"
                    style={{ color: "white", fontWeight: 'bold' }}
                  >
                    Login
                  </a>
                ) : (
                  <a
                    className="nav-link"
                    href="/logout"
                    onClick={this.onLogout}
                    style={{ color: "white" }}
                  >
                    Log out
                  </a>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default MainNavbar;
