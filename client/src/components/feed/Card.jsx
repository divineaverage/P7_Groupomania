import { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import Overlay from 'react-bootstrap/Overlay';
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../store/store"
import "../../sass/app.scss";
import "./card.scss";
import { addProfile, getProfileById } from "../store/profileSlice";

const PostCard = (post) => {
  const { authorId, caption, date, imageUrl } = post || {};
  // const { name } = getUserById(authorId) || {};
  
 
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const userState = useSelector((state) => state.user);
  const profileState =
    getProfileById(store.getState().profile, userState._id) || {};
  const [profile, setProfile] = useState(getProfileById(
    profileState,
    authorId
  ))
  // const lastLogin = useState(getProfileById(
  //   lastLogin
  // ))
  const [unread, setUnread] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token]);

  useEffect(() => {
    fetch("http://localhost:8080/api/profile/" + authorId, {
      method: "GET",
      headers: {"Content-Type": "application/json",
      Authorization: "Bearer " + profileState.token},
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

  // function styleUnread() {
  //   var lastLogin = profile.lastLogin;
  //  if ((date.getTime()) > (lastLogin.getTime()))
  //   setUnread(true)
  // }

  console.log(profile);

  return (
    <Card className="card" style={{ maxWidth: "40rem" }}>
      <div className="card-image-container">
        <Card.Img className="card-image" variant="top" src={imageUrl} />
      </div>
      <Card.Body>
      <Overlay 
      // onload={styleUnread()} 
      unread={unread} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            New post
          </div>
        )}
      </Overlay>
        {profile&&<Card.Title>{profile.name}</Card.Title>}
        <Card.Text>{caption}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="date">{date}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default PostCard;
