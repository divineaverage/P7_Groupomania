import Button from 'react-bootstrap/Button';
import "./feed.scss"

function PostButton() {
  return (
    <>
      <div className="mb-2">
        <Button variant="dark" size="lg" href="/CreatePost">New Post</Button>{' '}
      </div>
    </>
  );
}

export default PostButton;