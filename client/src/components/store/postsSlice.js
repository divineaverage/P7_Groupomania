import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import app from "../../App"

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  userToken: null, // for storing the JWT
}

export const addNewPost = createAsyncThunk(
  "../feed/posts/AddPostForm",
  // The payload creator receives the partial `{title, content, user}` object
  async initialPost => {
    // We send the initial data to the  API server
    const response = await app.post("/createPost", initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        // omit prepare logic
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const { postAdded, postUpdated, setPosts, setPost } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)