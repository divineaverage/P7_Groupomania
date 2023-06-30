import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import { getProfileById, deleteProfile } from "../store/profileSlice";



const DeleteButton = () => {
    const userState = useSelector((state) => state.user);
    const profileState =
    getProfileById(store.getState().profile, userState._id) || {};
    console.log(profileState)

    const handleDelete = async (e) => {
      e.preventDefault();
        fetch("http://localhost:8080/api/profile/" + profileState.userId, {
            headers: {
              method: "DELETE",
              "Content-Type": "application/json",
              Authorization: "Bearer " + userState.token,
              },
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
