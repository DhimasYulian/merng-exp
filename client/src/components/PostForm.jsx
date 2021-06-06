import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'

import { useForm } from '../utils/hooks'
import {FETCH_POSTS_QUERY} from '../utils/graphql'

const PostForm = () => {
    const {values, handleChange, handleSubmit} = useForm(createPostCb, {content: ""})
    const [error, setError] = useState(null)
    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update: (proxy, result) => {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            })
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data: {getPosts: [result.data.createPost, ...data.getPosts]}})
            values.content = ""
        },
        onError(error) {
            setError(error.message)
        }
    })

    function createPostCb() {
        createPost()
    }

    return (
        <div className="mt-4 rounded-xl shadow-md p-5">
            <form onSubmit={handleSubmit} className="grid grid-cols-4">
                <div className="col-span-3 flex items-center bg-gray-100 p-2 my-2 rounded-l-full">
                    <input name="content" value={values.content} onChange={handleChange} className="md:block flex items-center w-full ml-5 outline-none placeholder-gray-500 bg-gray-100 flex-shrink" type="text" placeholder="What's up..." />
                </div>
                <button className="bg-blue-400 col-span-1 text-white rounded-r-full my-2 hover:bg-blue-600" type="submit">Send</button>
            </form>
            {error && <p className="ml-3 text-red-500 text-xs">{error}</p> }
        </div>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($content: String!){
        createPost(content: $content){
            id
            content
            username
            createdAt
            likes{
                id
                username
            }
            likeCount
            comments{
                id content username createdAt
            }
            commentCount
        }
    }
`

export default PostForm
