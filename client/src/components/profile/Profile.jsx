import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import "../../sass/app.scss"
import { useNavigate, Link } from "react-router-dom"
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
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{email}</td>
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
