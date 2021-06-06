import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth'

import {fromNow} from '../components/Post'
import LikeButton from '../components/LikeButton'
import { ChatAlt2Icon } from '@heroicons/react/outline'
import DeleteButton from '../components/DeleteButton'
import { useForm } from '../utils/hooks'

const PostDetail = (props) => {
    const {values, handleChange, handleSubmit} = useForm(createCommentCb, {content: ""})
    const [error, setError] = useState(null)
    const {user} = useContext(AuthContext)
    const postId = props.match.params.postId
    const {loading, data} = useQuery(FETCH_POST_QUERY, {
        variables: {postId}
    })
    const post = data ? data.getPost : []
    const {username, createdAt, content, likes, comments, likeCount, commentCount} = post
    const deleteCallback = () => {
        props.history.push("/")
    }
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        variables: {postId, content: values.content},
        update(){
            values.content = ""
        },
        onError(error){
            setError(error.message)
        }
    })

    function createCommentCb(){
        createComment()
    }
    return (
        <div className="container max-w-[1000px] mx-auto mt-6">
            {
                loading ? <div className="mx-auto mt-4 text-lg">Loading...</div> : 
                (
                    <div className="grid grid-cols-8 gap-5">
                        <div className="hidden md:block col-span-1 relative">
                            <img className="rounded-full sticky top-20 w-full" src="/assets/default_avatar.jpg" alt="" />
                        </div>
                        <div className="col-span-8 md:col-span-4">
                            <div className="shadow-lg rounded-lg py-5 px-8">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-2xl font-bold">{username}</p>
                                        <p className="text-gray-400 text-md">{fromNow(createdAt)}</p>
                                    </div>
                                    {
                                        user && user.username === username && <DeleteButton postId={postId} callback={deleteCallback} /> 
                                    }
                                </div>
                                <p className="text-base my-5">{content}</p>
                                <div className="flex justify-around mt-4">
                                    <LikeButton user={user} id={postId} likes={likes} likeCount={likeCount} />
                                    <button className="p-3 text-gray-400 flex hover:text-blue-500"> <ChatAlt2Icon className="h-6 w-6" /> <span className="ml-2">{commentCount}</span></button>
                                </div>
                            </div>
                            <div className="block md:hidden shadow-md rounded-xl w-full bg-white sticky top-20">
                                <form onSubmit={handleSubmit} className="p-4">
                                    <h2 className="font-semibold text-lg">Comment</h2>
                                    <div className="flex items-center w-full bg-gray-100 p-2 my-2 rounded-full">
                                        <input name="content" value={values.content} onChange={handleChange} className="md:block flex items-center w-full ml-5 outline-none placeholder-gray-500 bg-gray-100 flex-shrink" type="text" placeholder="What's up..." />
                                    </div>
                                    <button className="bg-blue-400 w-full mt-1 py-2 text-white rounded-full my-2 hover:bg-blue-600" type="submit">Send</button>
                                </form>
                                {error && <p className="ml-3 text-red-500 text-xs">{error}</p> }
                            </div>
                            <div className="mt-5">
                            {
                                comments.map(comment => (
                                    <div className="shadow-lg rounded-lg py-5 px-8 mt-3">
                                        <div className="flex justify-between">
                                            <div className="flex items-center">
                                            <img className="rounded-full w-12 h-12" src="/assets/default_avatar.jpg"  alt="" />
                                            <div className="ml-3">
                                            <p className="text-xl font-bold">{comment.username}</p>
                                            <p className="text-gray-400 text-sm">{fromNow(comment.createdAt)}</p>
                                            </div>
                                            </div>
                                            {
                                                user && user.username === comment.username && <DeleteButton postId={postId} commentId={comment.id} /> 
                                            }
                                        </div>
                                        <p className="text-base my-5">{comment.content}</p>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        <div className="hidden md:block col-span-3 relative">
                            <div className="shadow-md rounded-xl w-full sticky top-20">
                                <form onSubmit={handleSubmit} className="p-4">
                                    <h2 className="font-semibold text-lg">Comment</h2>
                                    <div className="flex items-center w-full bg-gray-100 p-2 my-2 rounded-full">
                                        <input name="content" value={values.content} onChange={handleChange} className="hidden md:block flex items-center w-full ml-5 outline-none placeholder-gray-500 bg-gray-100 flex-shrink" type="text" placeholder="What's up..." />
                                    </div>
                                    <button className="bg-blue-400 w-full mt-1 py-2 text-white rounded-full my-2 hover:bg-blue-600" type="submit">Send</button>
                                </form>
                                {error && <p className="ml-3 text-red-500 text-xs">{error}</p> }
                            </div>
                        </div>
                    </div>
                ) 
            }
        </div>
    )
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id
            content
            username
            createdAt
            likes{
                id
                username
            }
            comments{
                id
                username
                content
                createdAt
            }
            likeCount
            commentCount
        }
    }
`

const CREATE_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $content: String!){
        createComment(postId: $postId, content: $content){
            id
            comments{
                id
                username
                content
                createdAt
            }
            commentCount
        }
    }
`

export default PostDetail
