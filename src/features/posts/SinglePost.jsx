import { selectPostByID } from "./postsSlice";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const SinglePost = ()=>{
  const {postId} = useParams()
 
  const post = useSelector((state)=>
    selectPostByID(state, Number(postId))
  )
  if(!post){
    return <section> No Post Found</section>
  }



  return (
    <article>
       <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/postLists/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId}/>
        <TimeAgo timestamp={post.date}/>
      </p>
      <ReactionButtons post={post}/> 
   
    </article>
  )
}




export default SinglePost