import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import postsReducer from '../features/posts/postsSlice'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  }
})

