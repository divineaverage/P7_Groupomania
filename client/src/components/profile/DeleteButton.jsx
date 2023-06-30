import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { store } from "../store/store";
import { getProfileById } from "../store/profileSlice";



const DeleteButton = () => {
    const userState = useSelector((state) => state.user);
    const profileState =
    getProfileById(store.getState().profile, userState._id) || {};
    console.log(profileState)
    const handleDelete = async (e) => {
      e.preventDefault();
       try {
          const response = await fetch("http://localhost:8080/api/profile/" + profileState.userId, {
            headers: {
              method: "DELETE",
              "Content-Type": "application/json",
              Authorization: "Bearer " + userState.token,
              },
            })
          console.log(response.data);
       } catch (error) {
          console.error(error);
       }
      }
    return (
        <div type="button" className="red-button">
            <Button variant="danger" onClick={handleDelete} >Delete Account</Button>
          </div>
     );
  };
  export default DeleteButton;
