import React, { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../shared/Nav";
import Footer from "../shared/Footer";
import "../../sass/app.scss";
import { store } from "../store/store";
import { setLogin } from "../store/userSlice";
import { getProfileById } from "../store/profileSlice";
import "./profile.scss";
import { useNavigate } from "react-router-dom";
import DeleteButton from "./DeleteButton"

const MyProfile = () => {
  const userState = useSelector((state) => state.user);
  const profileState =
    getProfileById(store.getState().profile, userState._id) || {};
  const [profile, setProfile] = useState(profileState);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect (() => {
    if (!token) {
      navigate ("/auth")
    } else {
      getProfile();
      getLastLogin();
    }
  }, [token]);

  const getProfile = async () => {
    
    const response = await fetch("http://localhost:8080/api/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();

      dispatch(setProfile({ profile: data }));
      }
  };

  const getLastLogin = async () => {
    
    const response = await fetch("http://localhost:8080/api/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      store.dispatch(setLogin({ lastLogin: new Date()}));
      }
  };

  console.log(profile)

  // const handleChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };


  // const handleFormSubmission = (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:8080/api/profile/" + profileState.userId, {
  //       method: "PUT",
  //       headers: {"Content-Type": "application/json",
  //       Authorization: "Bearer " + userState.token},
  //   })
  //     .then((res) => {
  //       if (res.ok) return res;
  //       console.log(res);
  //       throw new Error();
  //     })
  //     .then((res) => res.json())
  //     .then(async (user) => {
  //       console.log(user);
  //       await store.dispatch(
  //         setLogin({ user: user.userId, token: user.token })
  //       );
  //       store.dispatch(addProfile(user));
  //     })
  //     .catch(() => {
  //       console.warn("Unable to update.");
  //     });
  // };

  return (
    <div className="Profile">
      <NavBar></NavBar>
      <div className="profiletext">
      <Stack gap={3}>
      <div className="fieldname">Name: <span className="userinfo">{profile._doc.name}</span></div>
      <div className="fieldname">Email: <span className="userinfo">{profile._doc.email}</span></div>
      <div className="fieldname">Last login: <span className="userinfo">{profile._doc.lastLogin}</span></div>
      <div className="blank"></div>
      </Stack>
      </div>
      <DeleteButton></DeleteButton>
      <Footer></Footer>
    </div>
  );
};

export default MyProfile;
