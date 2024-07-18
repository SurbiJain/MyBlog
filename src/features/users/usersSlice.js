import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';


export const addNewUser = createAsyncThunk('users/addNewUser', async (initialPost) => {
  const response = await axios.post(USERS_URL, initialPost)
  return response.data
})

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try{
    const response = await axios.get(USERS_URL);
  return [...response.data]
  }
  catch(err){
    return err.message
  }
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
userAdded:{
  reducer(state, action) {
    state.push(action.payload);
  },
  prepare(user){
    return{
      payload:{
        id: nanoid(),
        name: user
      }
    }
  }
}
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
    })
    .addCase(addNewUser.fulfilled, (state, action)=>{
      return (
        
        action.payload,
        state.push(action.payload)
      )
    })
}
})
export const selectAllUsers = (state)=> state.users
export const {userAdded}= userSlice.actions
export default userSlice.reducer