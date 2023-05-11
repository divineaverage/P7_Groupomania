import React, { useState } from "react"
import { useSelector, useDispatch, } from "react-redux"
// import { POST_TYPES } from "../../redux/actions/postAction"
import PostCard from "./Posts/PostCard"
import "../../sass/app.scss"
import NavBar from "../shared/Nav"
import Footer from "../shared/Footer"
import PostButton from "./PostButton"

import LoadIcon from "../../assets/loading.gif"
import LoadMoreBtn from "./LoadMoreBtn"
import { getDataAPI } from "../../utils/fetchData"



const Posts = () => {
    const { homePosts, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

        dispatch({
            type: POST_TYPES.GET_POSTS, 
            payload: {...res.data, page: homePosts.page + 1}
        })

        setLoad(false)
    }

    return (
        <div className="post-page-container">
            <NavBar></NavBar>
            <h1>Latest Posts</h1>
        <div className="posts">
            {
                homePosts.posts.map(post => (
                    <PostCard key={post._id} post={post} theme={theme} />
                ))
            }

            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            
            <LoadMoreBtn result={homePosts.result} page={homePosts.page}
            load={load} handleLoadMore={handleLoadMore} />
        </div>
        <PostButton></PostButton>
        <Footer></Footer>
        </div>
    )
}

export default Posts
