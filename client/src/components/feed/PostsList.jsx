import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setPosts } from "../store/postsSlice"
import "../../sass/app.scss"
import "./postsList.scss"
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import PostButton from "./PostButton"
import Card from "./Card"
import { useNavigate } from "react-router-dom"


  const PostsList = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {posts} = useSelector((state) => state.posts);
    const {token} = useSelector((state) => state.user);

    useEffect (() => {
      if (!token) {
        navigate ("/auth")
      }
    }, [token]);
  
    const getPosts = async () => {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };
  
    const getUserPosts = async () => {
      const response = await fetch(
        `http://localhost:8080/api/posts/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };
  
    useEffect(() => {
      if (isProfile) {
        getUserPosts();
      } else {
        getPosts();
      }
    }, []);

    const card = card[0]
    
  return (
      <>
      <NavBar></NavBar>
        {posts.map(
          ({
            _id,
            userId,
            name,
            caption,
            picturePath,
            likes,
          }) => (
            <Card
              key={_id}
              postId={_id}
              postUserId={userId}
              name={name}
              caption={caption}
              picturePath={picturePath}
              likes={likes}
            />
          )
        )}
        <PostButton></PostButton>
        <Footer></Footer>
      </>
    );
  };

export default PostsList