import Button from 'react-bootstrap/Button';
import "./postsList.scss"
import { useNavigate } from 'react-router-dom';

function PostButton() {
  const navigate = useNavigate()
  return (
    <>
      <div className="mb-2">
        <Button variant="dark" size="lg" onClick={()=>{navigate("/CreatePost")}}>New Post</Button>{' '}
      </div>
    </>
  );
}

export default PostButton;