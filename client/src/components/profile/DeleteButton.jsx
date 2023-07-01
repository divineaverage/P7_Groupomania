import React, { useEffect } from "react"; 
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import { getProfileById, deleteProfile } from "../store/profileSlice";
import { useNavigate } from "react-router-dom";


const DeleteButton = () => {
    const userState = useSelector((state) => state.user);
    const profileState = getProfileById(store.getState().profile, userState._id) || {};
    const {token} = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
          navigate("/auth");
        }
      }, [token]);

    const handleDelete = async (e) => {
      e.preventDefault();
        fetch("http://localhost:8080/api/profile/" + profileState.userId, {
              method: "DELETE",
              headers: {"Content-Type": "application/json"},
              Authorization: "Bearer " + profileState.token,
            })
            .then(async (response) => {
                if (response.ok) {
                    const profile = await response.json();
                    store.dispatch(deleteProfile(profile[0]));
                }
            })
            .catch(() => ({}));
        }


    return (
        <div type="button" className="red-button">
            <Button variant="danger" onClick={handleDelete} >Delete Account</Button>
          </div>
     );
  };
  export default DeleteButton;
