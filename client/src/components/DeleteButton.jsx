import { useMutation } from '@apollo/client'
import { TrashIcon } from '@heroicons/react/outline'
import gql from 'graphql-tag'
import React from 'react'

import {FETCH_POSTS_QUERY} from '../utils/graphql'

const DeleteButton = ({postId, commentId, callback}) => {

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
    
    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy){
            if(!commentId){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                proxy.writeQuery({query: FETCH_POSTS_QUERY, data: {getPosts: data.getPosts.filter(p => p.id !== postId)}})
            }
            if(callback) callback()
        },
        variables: {postId, commentId}
    })
    function handleDelete() {
        if(window.confirm(`Are you sure want to delete this ${commentId ? "comment" : "post"}?`)){
            deletePostOrComment()
        }
    }
    return (
        <TrashIcon onClick={handleDelete} className="cursor-pointer text-gray-400 hover:text-red-500 w-5 h-5" />
    )
}

const DELETE_POST_MUTATION = gql`
    mutation($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id
                content
                username
                createdAt
            }
            commentCount
        }
    }
`

export default DeleteButton
