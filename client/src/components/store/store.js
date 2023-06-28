import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import posts from './postsSlice'
import user from './userSlice'
import profile from './profileSlice'

const reducer = combineReducers({
  user, posts, profile,
})

const store = configureStore({
  reducer,
})

export default store;

