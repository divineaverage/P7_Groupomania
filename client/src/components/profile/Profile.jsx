import React, { useState, useEffect } from 'react'
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import "../../sass/app.scss"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"



export default function Profile() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [user, setUser] = useState(null);
    const {token} = useSelector((state) => state.user);
    const navigate = useNavigate();
 
    useEffect (() => {
        if (!token) {
          navigate ("/auth")
        }
      }, [token]);

      const getUser = async () => {
        const response = await fetch(`http://localhost:8080/api/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      };
    
      useEffect(() => {
        getUser();
      }, []); 
    
      if (!user) {
        return null;
      }

    return (
   
        <div className="main-container">
            <NavBar></NavBar>
            <h1 className="hidden-h1">Profile</h1>
            <div className="info-container">
                <div className="info">
                    <h2>Profile information</h2>
                    <div className="underline" />
                    <table>
                        <thead className="thead">
                            <tr>
                                <th className="column title" colSpan="1">Fields</th>
                                <th className="column date" colSpan="1">User info</th>
                            </tr>
                        </thead>

                        <tr>
                            <td> <p className="profile-info-input">User name</p> </td>
                            <td> <p className="profile-line-data"> {name}</p> </td>
                        </tr>

                        <tr>
                            <td> <p className="profile-info-input">Email</p> </td>
                            <td> <p className="profile-line-data">{email}</p> </td>
                        </tr>
                    </table>

                </div>


            </div >
            
            <Footer></Footer>
        </div >
    )
                }
