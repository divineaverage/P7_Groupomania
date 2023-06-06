import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setPosts } from "../store/postsSlice"
import "../../sass/app.scss"
import "./postsList.scss"
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import PostButton from "./PostButton"
import SinglePost from "./SinglePost"


  const PostsList = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const {posts} = useSelector((state) => state.posts);
    const {token} = useSelector((state) => state.user);
  
    const getPosts = async () => {
      const response = await fetch("http://localhost:8080/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };
  
    const getUserPosts = async () => {
      const response = await fetch(
        `http://localhost:8080/posts/${userId}/posts`,
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

  return (
      <>
      <NavBar></NavBar>
        {posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            picturePath,
            userPicturePath,
            // likes,
            // dislikes,
          }) => (
            <SinglePost
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              // likes={likes}
              // dislikes={dislikes}
            />
          )
        )}
        <PostButton></PostButton>
        <Footer></Footer>
      </>
    );
  };

export default PostsList