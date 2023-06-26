import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import posts from './postsSlice'
import user from './userSlice'

const reducer = combineReducers({
  user, posts,
})

const store = configureStore({
  reducer,
})

export default store;

