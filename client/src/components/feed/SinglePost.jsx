import { Icon, ListGroup, Card, Button, props, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"

const SinglePost = ({
  name,
  picturePath,
  userPicturePath,
 
}) => {

  const [isLiked, updateLike] = useState(false);
  const handleLike = () => {
    let currentLikedPosts = props.likedPosts;
    if (!isLiked) {
      updateLike(true);
      if (!currentLikedPosts.includes(name))
        props.updateLikedPosts(
          [...currentLikedPosts, name]
        );
    } else {
      updateLike(false);
      if (currentLikedPosts.includes(name))
        props.updateLikedPosts(
          currentLikedPosts
          .filter(band => band !== name)
          );
    }
  };


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img userPicturePath={userPicturePath} />
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3000/assets/${picturePath}`}
        />
      )}
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>name={name}</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
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
        <Button
          onClick={handleLike}
          disabled={!isLiked}
          >
          <Icon
            icon={FaThumbsDown}
            style={{ paddingLeft: 5 }}
            />
            </Button></ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default SinglePost;
