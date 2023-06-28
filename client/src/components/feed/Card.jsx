import { Icon, useState, useEffect, props } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Card, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import store from "../store/store"
import "../../sass/app.scss";
import "./card.scss";
import { addProfile, getProfileById } from "../store/profileSlice";

const PostCard = (post) => {
  const { _id, authorId, name, caption, date, imageUrl, likes } = post || {};
  
  console.log(post);

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const profileState = useSelector((state) => state.profile)
  const [profile, setProfile] = useState(getProfileById(
    profileState,
    authorId
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

  console.log(authorId)

      console.log(profile)

  // const [isLiked, updateLike] = useState(false);
  // const handleLike = () => {
  //   let currentLikedPosts = props.likedPosts;
  //   if (!isLiked) {
  //     updateLike(true);
  //     if (!currentLikedPosts.includes(_id))
  //       props.updateLikedPosts([...currentLikedPosts, _id]);
  //   } else {
  //     updateLike(false);
  //     if (currentLikedPosts.includes(_id))
  //       props.updateLikedPosts(
  //         currentLikedPosts.filter((post) => post !== _id)
  //       );
  //   }
  // };
console.log("about to render!!!")
  return (
    <Card className="card" style={{ maxWidth: "40rem" }}>
      <div className="card-image-container">
        <Card.Img className="card-image" variant="top" src={imageUrl} />
      </div>
      <Card.Body>
        {profile&&<Card.Title>{profile.name}</Card.Title>}
        <Card.Text>{caption}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="date">{date}</ListGroup.Item>
        <ListGroup.Item>
          {/* <Button variant="dark" onClick={handleLike} disabled={isLiked}>
            <FaThumbsUp />
          </Button> */}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default PostCard;
