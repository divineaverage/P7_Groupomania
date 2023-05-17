import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import app from "../../App"

const initialState = {
  posts: [],
  status: "idle",
  error: null
}

export const addNewPost = createAsyncThunk(
  "../feed/posts/AddPostForm",
  // The payload creator receives the partial `{title, content, user}` object
  async initialPost => {
    // We send the initial data to the fake API server
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
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
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

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)