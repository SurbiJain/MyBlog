import React from 'react'
import {
  Route,
  Routes,
} from 'react-router-dom'

import  Navbar  from './components/Navbar'
import PostsList from './features/posts/PostsLists'
import AddPostForm from './features/posts/AddPostForm'
import SinglePost from './features/posts/SinglePost'
import EditPost from './features/posts/EditPost'


function App() {
  return (
    <>
    <Navbar/>
    <Routes> 
    <Route path="/postLists" >
    <Route index element={<PostsList/>}/>
    <Route path=":postId" element={<SinglePost/>}/>
    <Route path="edit/:postId" element={<EditPost/>}/>
    </Route>
    <Route path="/addPost" element={<AddPostForm/>}/>
    
    </Routes>
    </>
  )
}

export default App