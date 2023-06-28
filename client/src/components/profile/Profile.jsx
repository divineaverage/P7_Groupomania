import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import "../../sass/app.scss"
import store from "../store/store"
import { setLogin } from "../store/userSlice";
import { getProfileById } from "../store/profileSlice";
import "./profile.scss"



const MyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorId, setAuthorId] = useState("");
  const profileState = useSelector((state) => state.profile);
  const [profile, setProfile] = useState(getProfileById(
    profileState,
    authorId
  ))

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault()
    fetch("http://localhost:8080/api/profile/" + authorId, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, email, password}),
    })
    .then(res=>{
      if (res.ok) return res
      console.log(res)
      throw new Error()
    })
    .then(res=>res.json()).then( async user=>{
      console.log(user);
      await store.dispatch(setLogin({user:user.userId, token:user.token}));
    }).catch(()=>{
      console.warn("Unable to update.")
    })
  }


  return (
    <div className="App">
      <NavBar></NavBar>
      <form
        onSubmit={(e) => {
          handleFormSubmission(e);
        }}
      >        
        <h1> Profile </h1>
        <label>Name:</label>
        <br />
        <input
          type="text"
          value={name}
          required
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />

        <label>Email:</label>
        <br />
        <input
          type="email"
          value={email}
          required
          onChange={(e) => {
            handleEmailChange(e);
          }}
        />
        <br />

        <label>Password:</label>
        <br />
        <input
          type="password"
          value={password}
          required
          onChange={(e) => {
            handlePasswordChange(e);
          }}
        />
        <br />
        <div className="buttons">
        <Button type="update" className="btn btn-dark">
                  Update
                </Button>
        <div className="red-button">
        <Button type="delete" className="btn btn-dark">
                  Delete Account
                </Button>
                </div>
          </div>
      </form>
      <Footer></Footer>
    </div>
  );
}

export default MyProfile;