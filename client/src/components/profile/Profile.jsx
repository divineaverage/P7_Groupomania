import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import NavBar from "../shared/Nav";
import Footer from "../shared/Footer";
import "../../sass/app.scss";
import { store } from "../store/store";
import { setLogin } from "../store/userSlice";
import { getProfileById, addProfile } from "../store/profileSlice";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import DeleteButton from "./DeleteButton"

const MyProfile = () => {
  const userState = useSelector((state) => state.user);
  const profileState =
    getProfileById(store.getState().profile, userState._id) || {};
  const [name, setName] = useState(profileState.name);
  const [email, setEmail] = useState(profileState.email);
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(profileState)
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(name)


  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token]);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/profile/" + profileState.userId, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then(async (response) => {
  //       if (response.ok) {
  //         const profile = await response.json();
  //         store.dispatch(addProfile(profile[0]));
  //         setProfile(profile[0])
  //       }
  //     })
  //     .catch(() => ({}));
  // }, [])
  

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
    e.preventDefault();
    fetch("http://localhost:8080/api/profile/" + profileState.userId, {
      headers: {
        method: "PUT",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userState.token,
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (res.ok) return res;
        console.log(res);
        throw new Error();
      })
      .then((res) => res.json())
      .then(async (user) => {
        console.log(user);
        await store.dispatch(
          setLogin({ user: user.userId, token: user.token })
        );
        store.dispatch(addProfile(user));
      })
      .catch(() => {
        console.warn("Unable to update.");
      });
  };

  return (
    <div className="App">
      <NavBar></NavBar>
      {/* <form onSubmit={handleFormSubmission}> */}
      <form>
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
          defaultValue="*****"
          required
          onChange={handlePasswordChange}
        />
        <br />
        <div className="buttons">
          <Button type="submit" className="btn btn-dark">
            Update
          </Button>
          <DeleteButton></DeleteButton>
        </div>
      </form>
      <Footer></Footer>
    </div>
  );
};

export default MyProfile;
