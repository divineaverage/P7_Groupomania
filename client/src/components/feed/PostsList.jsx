import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setPosts } from "../store/postsSlice"
import "../../sass/app.scss"
import "./postsList.scss"
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import PostButton from "./PostButton"
import Card from "./Card"
import { useNavigate } from "react-router-dom"
import "../../sass/app.scss";


  const PostsList = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {posts} = useSelector((state) => state.posts);
    const {token} = useSelector((state) => state.user);
    // const [items, setItems] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const [page, setPage] = useState(1);
    

    useEffect (() => {
      if (!token) {
        navigate ("/auth")
      }
    }, [token]);
  
    const getPosts = async () => {
      // setIsLoading(true);
      // setError(null);
      console.log("!!!!!"+token)

      const response = await fetch("http://localhost:8080/api/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        // setItems(prevItems => [...prevItems, ...data]);
        // setPage(prevPage => prevPage + 1);
        dispatch(setPosts({ posts: data }));
        }
    };
  
    useEffect(() => {
      getPosts();
    }, []);
    
  return (
      <>
      <NavBar></NavBar>
        {[...posts].reverse().map(
          ({
            _id,
            userId,
            name,
            caption,
            imageUrl,
            date,
            likes,
          }) => (
            <Card
              key={_id}
              postId={_id}
              postUserId={userId}
              name={name}
              caption={caption}
              date={date}
              imageUrl={imageUrl}
              likes={likes}
            />
          )
        )}
        <PostButton></PostButton>
        <div className="spacer"></div>
        <Footer></Footer>
      </>
    );
  };

export default PostsList