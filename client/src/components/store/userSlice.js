import { createSlice } from '@reduxjs/toolkit'

  const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
  }

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
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
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  slice.actions;


export default slice.reducer


const { loginSuccess, logoutSuccess } = slice.actions

export const login = ({ username, password }) => async dispatch => {
  try {
    dispatch(loginSuccess({username, password}));
  } catch (e) {
    return console.error(e.message);
  }
  
}

export const logout = () => async dispatch => {
  try {
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
}