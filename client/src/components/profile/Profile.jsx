import React, { useContext, useState, useEffect } from 'react'
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import "../../sass/app.scss"
import { useHistory } from "react-router-dom";
import DataContext from '../../utils/fetchData';

import DeleteAccModal from './DeleteAccModal'



export default function Profile() {

    const [isOpenDeleteAccModal, setIsOpenDeleteAccModal] = useState(false)
    const [isprofileDeleted, setisprofileDeleted] = useState(false)

    const { dataUser, LStoken } = useContext(DataContext)
 

   

    function deleteAccount() {
      //  function deleteAccount(id) {
        fetch(`/user/delete/${dataUser.id}`, {method: "DELETE"})
            .then((response) => {
                console.log(response + 'profile deleted')
                setisprofileDeleted(true)
                localStorage.setItem('token', '')
                localStorage.setItem('id', '')
            })
    }

    if (isprofileDeleted) {
        return (
            <div className="main-container">
                <div className="delete-profile-msg">Profile deleted</div>
            </div>
        )
    }


    return (
   
        <div className="main-container">
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
                            <td> <p className="profile-info-input">Username</p> </td>
                            <td> <p className="profile-line-data"> {dataUser.name}</p> </td>
                        </tr>

                        <tr>
                            <td> <p className="profile-info-input">Email</p> </td>
                            <td> <p className="profile-line-data">{dataUser.email}</p> </td>
                        </tr>
                    </table>

                    {dataUser.moderator == true ?

                        <div className="card-status admin">ADMIN STATUS</div>
                        :
                        <div className="card-status user">USER STATUS</div>
                    }

                </div>


            </div >
            <button className="delete-account-button" onClick={() => setIsOpenDeleteAccModal(true)}>Delete my profile</button>
            <DeleteAccModal open={isOpenDeleteAccModal} onClose={() => setIsOpenDeleteAccModal(false)} >
                Would you like to delete your account?
                <div className="answer-btn-box">
                    <button className="btn-answer yes" onClick={() => deleteAccount(dataUser.id)}>Yes</button>
                </div>
            </DeleteAccModal>
        </div >
    )
                }
