import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import React from "react";



const PostsExcerpt = ({ post }) => {
    console.log("postecert")
    return (
        <article>
            <h3 >{post.title}</h3>
            <p>{post.body?.substring(0, 75)}...</p>
            <p className="postCredit ">
                <Link to={`/postLists/${post.id}`} className="mr-5">View Posts</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
           
            <ReactionButtons post={post} />
            
        </article>
    )
}
export default React.memo(PostsExcerpt);