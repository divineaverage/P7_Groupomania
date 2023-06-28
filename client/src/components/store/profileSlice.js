import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile: (state, action) => {
        state[action.payload._id] = action.payload
    },
  },
});

export const { addProfile } =
  slice.actions;


export default slice.reducer

export function getProfileById(state, id){
    return state[id]
}