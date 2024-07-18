import  { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { updateNewPost, selectPostByID, deletePost   } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { useNavigate, useParams} from 'react-router-dom'



const EditPost = () => {
  const {postId} = useParams()
  const navigate = useNavigate()
const post = useSelector((state)=>
  selectPostByID(state, Number(postId)));
console.log(post)
const users = useSelector(selectAllUsers)
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onUserChanged = e => setUserId(Number(e.target.value))
  

  const dispatch = useDispatch()
  
  if(!post){
    return <h1>No Post Found</h1>
  }
  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
  
  const onSavePostClicked = ()=>{
    if (canSave) {
      try { 
          setAddRequestStatus('pending')
          dispatch(updateNewPost({id: post.id, title, body: content, userId, reactions:post.reactions})).unwrap()
          setTitle('')
          setContent('')
          setUserId('')
          navigate(`/postLists/${postId}`)
         
      } catch (err) {
          console.error('Failed to save the post', err)
      } finally {
          setAddRequestStatus('idle')
      }
       
  }
}

   
  
  const userOptions = users.map((user)=>{
   return( <option key={user.id} value={user.id}>{user.name}</option>)
      })
      const onDelete = ()=>{
        
          try { 
              setAddRequestStatus('pending')
              dispatch(deletePost({id: post.id})).unwrap()
              setTitle('')
              setContent('')
              setUserId('')
              navigate(`/postLists`)
             
          } catch (err) {
              console.error('Failed to delete the post', err)
          } finally {
              setAddRequestStatus('idle')
          }
           
        }
  return (
    <section >
      <h2>Edit the Post </h2>
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
        <select id='postAuthor'  defaultValue={userId} onChange={onUserChanged}>
        <option value=""></option>
        {userOptions}
      </select> 
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
        <button type="button" onClick={onDelete} >Delete</button>
      </form>
    </section>
  )
}


export default EditPost;