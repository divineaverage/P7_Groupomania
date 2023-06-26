import { Icon, useState, useEffect, props } from "react";
import { FaThumbsUp } from "react-icons/fa"
import { Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import "../../sass/app.scss";
import "./card.scss"


const PostCard = ( post ) => {
  
  const {
  _id,
  name,
  caption,
  date,
  imageUrl,
  likes,
  } = post || {};
  
  console.log(post)

  
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.user);

    useEffect (() => {
      if (!token) {
        navigate ("/auth")
      }
    }, [token]);
    

    const [isLiked, updateLike] = useState(false);
  const handleLike = () => {
    let currentLikedPosts = props.likedPosts;
    if (!isLiked) {
      updateLike(true);
      if (!currentLikedPosts.includes(_id))
        props.updateLikedPosts(
          [...currentLikedPosts, _id]
        );
    } else {
      updateLike(false);
      if (currentLikedPosts.includes(_id))
        props.updateLikedPosts(
          currentLikedPosts
          .filter(post => post !== _id)
          );
    }
  };

  return (
    <Card className="card" style={{ maxWidth: '40rem' }}>
      <div className="card-image-container">
      <Card.Img className="card-image" variant="top" src={imageUrl} /></div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {caption}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="date">{date}</ListGroup.Item>
        <ListGroup.Item> 
          <Button variant="dark" 
          onClick={handleLike}
          disabled={isLiked}
          ><FaThumbsUp /></Button>
      </ListGroup.Item></ListGroup>
    </Card>
  );
};

export default PostCard;
