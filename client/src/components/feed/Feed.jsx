import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'

import "../../sass/app.scss"
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import PostButton from "./PostButton"




export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
  
    const renderedPosts = posts.map(post => (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
      </article>
    ))

    return (
        <div className="post-page-container">
            <NavBar></NavBar>
            <h1>Latest Posts</h1>
            {renderedPosts}
        <PostButton></PostButton>
        <Footer></Footer>
        </div>
    )
}

export default PostsList
