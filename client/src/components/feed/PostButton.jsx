import Button from 'react-bootstrap/Button';
import "./feed.scss"

function PostButton() {
  return (
    <>
      <div className="mb-2">
        <Button variant="primary" size="lg">
        <Button href="/CreatePost">New Post</Button>
        </Button>{' '}
      </div>
    </>
  );
}

export default PostButton;