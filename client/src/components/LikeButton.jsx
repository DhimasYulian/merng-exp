import { useMutation } from '@apollo/client'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid'
import gql from 'graphql-tag'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const LikeButton = ({id, likes, likeCount, user}) => {
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        }else{
            setLiked(false)
        }
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id},
    })

    return (
        user ? (
            <button className="p-3 text-gray-400 flex hover:text-blue-500 outline-none" onClick={() => likePost()}> 
                {
                    liked ? (
                        <>
                            <SolidHeartIcon className="h-6 w-6 text-blue-500" /> <span className="ml-2">{likeCount}</span>
                        </>
                    ) : (
                        <>
                            <HeartIcon className="h-6 w-6" /> <span className="ml-2">{likeCount}</span>
                        </>
                    )
                }
            </button>
        ): (
            <Link className="p-3 text-gray-400 flex hover:text-blue-500" to="/login"> 
                <HeartIcon className="h-6 w-6" /> <span className="ml-2">{likeCount}</span>
            </Link>
        )
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`

export default LikeButton
