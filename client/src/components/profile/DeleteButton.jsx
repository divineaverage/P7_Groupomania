import React, { useEffect } from "react"; 
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import { getProfileById, deleteProfile } from "../store/profileSlice";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../store/userSlice";


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
              headers: {"Content-Type": "application/json",
            Authorization: "Bearer " + userState.token},
            })
            .then(async (response) => {
              console.log(response)
                if (response.status==200) {
                  console.log("inside!")
                    store.dispatch(setLogout())
                    navigate("/auth")
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
