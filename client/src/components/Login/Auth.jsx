import React, { useState } from "react";
import NavBar from "./AuthNav";
import Footer from "../shared/Footer";
import "./auth.scss";
import "../../sass/app.scss";
import store from "../store/store"
import { setLogin } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Auth (props) {
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleFormSubmission = (e) => {
    e.preventDefault()
    fetch("//localhost:8080/api/auth/" +(authMode==="signin"?"login": "signup"), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    })
    .then(res=>{
      if (res.ok) return res
      console.log(res)
      throw new Error()
    })
    .then(res=>res.json()).then(user=>{
      console.log(user);
      store.dispatch(setLogin({user:user.userId, token:user.token}));
      localStorage.setItem("authenticated", true);
      navigate("/PostsList");
    }).catch(()=>{
      console.warn("Login error")
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    changeAuthMode()
  }

  if (authMode === "signin") {
    return (
      <div className="page-container">
        <NavBar></NavBar>
        <div className="title-bar">
        <h1>Big words here</h1>
        <h3>Smaller words here</h3>
        </div>
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleFormSubmission}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <a href="/auth" className="link-primary" onClick={handleClick}>
                  Sign Up
                </a>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  required
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }

  return (
    <div className="page-container">
        <NavBar></NavBar>
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleFormSubmission}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <a href="/auth" className="link-primary" onClick={handleClick}>
              Sign In
            </a>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="e.g JaneDoe"
              // onChange={()}
            />
          </div>
          <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  required
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    <Footer></Footer>
    </div>
  );
}
