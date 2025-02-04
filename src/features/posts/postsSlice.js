
import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from 'axios'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = postsAdapter.getInitialState({
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
})
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL)
  return response.data
})


export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await axios.post(POSTS_URL, initialPost)
  return response.data
})

export const updateNewPost = createAsyncThunk('posts/updatePost', async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
      return response.data
  } catch (err) {
      //return err.message;
      return initialPost; // only for testing Redux!
  }
})


export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await axios.delete(`${POSTS_URL}/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
      // postAdded: {
      //     reducer(state, action) {
      //         state.posts.push(action.payload)
      //     },
      //     prepare(title, content, userId) {
      //         return {
      //             payload: {
      //                 id: nanoid(),
      //                 title,
      //                 content,
      //                 date: new Date().toISOString(),
      //                 userId,
      //                 reactions: {
      //                     thumbsUp: 0,
      //                     wow: 0,
      //                     heart: 0,
      //                     rocket: 0,
      //                     coffee: 0
      //                 }
      //             }
      //         }
      //     }
      // }, // dont require it with async thunk as we are getting data from server this time


      reactionAdded(state, action) {
        const { postId, reaction } = action.payload
        const existingPost = state.entities[postId]
        if (existingPost) {
            existingPost.reactions[reaction]++
        }
    
    }
},
  extraReducers(builder) {
    builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Adding date and reactions
            const loadedPosts = action.payload.map(post => {
              let min = 1
              post.date = sub(new Date(), { minutes: min++ }).toISOString();
              post.reactions = {
                  thumbsUp: 0,
                  wow: 0,
                  heart: 0,
                  rocket: 0,
                  coffee: 0
              }
              return post;
          });
            // Add any fetched posts to the array
            postsAdapter.upsertMany(state, loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
         
          action.payload.id = state.ids[state.ids.length - 1] + 1

          action.payload.userId = Number(action.payload.userId)
          action.payload.date = new Date().toISOString();
          action.payload.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
          }
          console.log(action.payload)
          postsAdapter.addOne(state, action.payload)
      })
      .addCase(
        updateNewPost.fulfilled, (state, action) =>{
          if (!action.payload?.id) {
            console.log('Update could not complete')
            console.log(action.payload)
            return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
       
        
        postsAdapter.upsertOne(state, action.payload)
    })
      .addCase(
        deletePost.fulfilled, (state, action) =>{
          if(!action.payload?.id){
            console.log('Delete could not complete')
            console.log(action.payload)
            return;
          }
          const { id } = action.payload;
          postsAdapter.removeOne(state, id)
        }
         
      )
    }
});




export const {
  selectAll: selectAllPosts,
  selectById: selectPostByID,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)


export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { increaseCount, reactionAdded } = postsSlice.actions

export default postsSlice.reducer