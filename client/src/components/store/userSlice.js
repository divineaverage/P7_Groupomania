import { createSlice } from '@reduxjs/toolkit'

  const initialState = {
    loading: false,
    userId: "",
    token: null, // for storing the JWT
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
      state.userId = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setMode, setLogin, setLogout, setPosts, setPost } =
  slice.actions;


export default slice.reducer