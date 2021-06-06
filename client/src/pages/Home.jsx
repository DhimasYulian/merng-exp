import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'

import { AuthContext } from '../context/auth'
import Post from '../components/Post'
import PostForm from '../components/PostForm'
import {FETCH_POSTS_QUERY} from '../utils/graphql'

const Home = () => {
    const {user} = useContext(AuthContext)
    const {loading, data} = useQuery(FETCH_POSTS_QUERY)
    const posts = data ? data.getPosts : []
    return (
        <div className="container max-w-[1000px] mx-auto mt-6">
            {
                user && <PostForm />
            }
            <h1 className="text-3xl ml-4 lg:ml-0 font-bold mt-5">Recent Posts</h1>
            <div className="grid mx-4 grid-cols-1 md:grid-cols-2 lg:mx-0 lg:grid-cols-3 gap-4 mt-6">
            {
                loading ? <p>Loading...</p> :
                posts && posts.map(post => (
                    <Post username={post.username} createdAt={post.createdAt} content={post.content} commentCount={post.commentCount} likeCount={post.likeCount} id={post.id} likes={post.likes} />
                ))
            }
            </div>
            
        </div>
    )
}

export default Home
