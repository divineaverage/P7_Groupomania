import { Icon, ListGroup, Card, Button, props, useState } from "react";
import { FaThumbsUp } from "react-icons/fa"

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
          {/* caption={caption} */}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>name={name}</ListGroup.Item>
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

export default SinglePost;
