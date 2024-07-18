import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <section className='flex gap-5 mb-5 bg-cyan-400 '>
        <Link to={"/postLists"}>Posts</Link>
        <Link to={"/addPost"}>Add New Post</Link>
        
      </section>
    </nav>
  )
}

export default Navbar