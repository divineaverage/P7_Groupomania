import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import "../../sass/app.scss"
import store from "../store/store"
import { setLogin } from "../store/userSlice";
import { getProfileById, addProfile } from "../store/profileSlice";
import "./profile.scss"



const MyProfile = () => {
  const userState = useSelector((state) => state.user)
  const profileState = getProfileById(store.getState().profile, userState.userId) || {};
  console.log(profileState)
  const [name, setName] = useState(profileState.name);
  const [email, setEmail] = useState(profileState.email);
  const [password, setPassword] = useState("");

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
    fetch("http://localhost:8080/api/profile/" + profileState._id, {
      method: "PUT",
      headers: {"Content-Type": "application/json", Authorization: "Bearer "+userState.token},
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
      store.dispatch(addProfile(user))
    }).catch(()=>{
      console.warn("Unable to update.")
    })
  }


  return (
    <div className="App">
      <NavBar></NavBar>
      <form
        onSubmit={handleFormSubmission}
      >        
        <h1> Profile </h1>
        <label>Name:</label>
        <br />
        <input
          type="text"
          defaultValue={name}
          required
          onChange={handleChange}
        />
        <br />

        <label>Email:</label>
        <br />
        <input
          type="email"
          defaultValue={email}
          required
          onChange={handleEmailChange}
        />
        <br />

        <label>Password:</label>
        <br />
        <input
          type="password"
          defaultValue={password}
          required
          onChange={handlePasswordChange}
        />
        <br />
        <div className="buttons">
        <Button type="submit" className="btn btn-dark">
                  Update
                </Button>
        <div className="red-button">
        <Button className="btn btn-dark">
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