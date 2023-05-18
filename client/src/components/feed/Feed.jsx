import { useSelector, useDispatch } from "react-redux"
import { setPosts } from "../store/postsSlice"
import "../../sass/app.scss"
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import PostButton from "./PostButton"
import SinglePost from "./SinglePost"


export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:8080/feed", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };


  return (
    <div className="page-container">
        <NavBar></NavBar>
          <SinglePost></SinglePost>
      <PostButton></PostButton>
        <Footer></Footer>
  </div>
  );
};

export default PostsList
