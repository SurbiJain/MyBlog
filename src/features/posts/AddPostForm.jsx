import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'


const AddPostForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const users = useSelector(selectAllUsers)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onUserChanged = e => setUserId(e.target.value)
  

  
  
  
  const onSavePostClicked = ()=>{
    if (canSave) {
      try {
          setAddRequestStatus('pending')
          dispatch(addNewPost({ title, body: content, userId })).unwrap()
          
          
          setTitle('')
          setContent('')
          setUserId('')
          navigate("/postLists")
         
      } catch (err) {
          console.error('Failed to save the post', err)
      } finally {
          setAddRequestStatus('idle')
      }
       
  }

    
  }
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
  const userOptions = users.map((user)=>{
   return( <option key={user.id} value={user.id}>{user.name}</option>)
      })
  return (
    <section >
      <h2>Add a New Post</h2>
      <form className='flex flex-col border px-24 py-10 rounded-lg bg-cyan'>
        <label htmlFor="postTitle">Post Title:</label>
        <input
      
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="writer">Author:</label>
        <select id='postAuthor'  value={userId} onChange={onUserChanged}>
        <option value=""></option>
        {userOptions}
      </select>
      
       
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm