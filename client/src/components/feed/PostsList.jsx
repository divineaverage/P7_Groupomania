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


    useEffect (() => {
      if (!token) {
        navigate ("/auth")
      } else {
        getPosts();
      }
    }, [token]);
  
    const getPosts = async () => {

      console.log("!!!!!"+token)
      
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();

        dispatch(setPosts({ posts: data }));
        }
    };
    
  return (
      <>
      <NavBar></NavBar>
        {[...posts].reverse().map(
          (post) => (
            <Card key={post._id}
            {...post}
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