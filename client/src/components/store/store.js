import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import posts from './postsSlice'
import user from './userSlice'
import profile from './profileSlice'

const reducer = combineReducers({
  user, posts, profile,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore(persistedReducer)
const persistor = persistStore(store)

export default { store, persistor }



