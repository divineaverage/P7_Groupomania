import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import "../../sass/app.scss"
import store from "../store/store"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { addProfile, getProfileById } from "../store/profileSlice";



const MyProfile = (userProfile) => {
  const { authorId, name, email } = userProfile || {};
  
  console.log(userProfile);

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const profileState = useSelector((state) => state.profile)
  const [profile, setProfile] = useState(getProfileById(
    profileState
  ))

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token]);

  useEffect(() => {
    fetch("http://localhost:8080/api/profile/" + authorId, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (response.ok) {
          const profile = await response.json();
          store.dispatch(addProfile(profile[0]));
          setProfile(profile[0])
        }
      })
      .catch(() => ({}));
  }, [])


    return (
   
        <div className="main-container">
            <NavBar></NavBar>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{userProfile.name}</td>
          <td>{userProfile.email}</td>
        </tr>
      </tbody>
    </Table>
        <div className="mb-2">
        <Button variant="dark" size="lg" onClick={()=>{navigate("/UpdateProfile")}}>Update Profile</Button>{' '}
            </div>
        <Footer></Footer>
        </div >
    )
}

export default MyProfile