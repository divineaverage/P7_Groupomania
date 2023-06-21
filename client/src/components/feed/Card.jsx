import { Icon, Button, useState, useEffect, props } from "react";
import { FaThumbsUp } from "react-icons/fa"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"


const PostCard = ({ post }) => {
  const [postData, setPostData] = useState(post);
  
  const {
  _id,
  name,
  caption,
  picturePath,
  likes,
  } = postData || {};

  
    const navigate = useNavigate();
    const {posts} = useSelector((state) => state.posts);
    const {token} = useSelector((state) => state.user);
    console.log(posts)

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
    <Card style={{ width: '18rem' }}>
      <Card.Img picturePath={picturePath} />
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:8080/server/${picturePath}`}
        />
      )}
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          {caption}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{name}</ListGroup.Item>
        <ListGroup.Item> 
          <Button
          onClick={handleLike}
          disabled={isLiked}
          >
          <Icon
            icon={FaThumbsUp} 
            style={{ paddingRight: 5 }}
          />
        </Button>
      </ListGroup.Item></ListGroup>
    </Card>
  );
};

export default PostCard;
