import React, { useContext } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {ChatAlt2Icon} from "@heroicons/react/outline"

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import { Link } from 'react-router-dom'

export const fromNow = (date) => {
    dayjs.extend(relativeTime)
    return dayjs(date).fromNow()
}

const Post = ({id, username, createdAt, content, commentCount, likeCount, likes}) => {
    const {user} = useContext(AuthContext)

    return (
        <div className="rounded-lg shadow-md hover:shadow-lg cursor-pointer w-full">
            <div className="px-5 py-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                <img className="rounded-full w-12 h-12" src="/assets/default_avatar.jpg"  alt="" />
                <div className="ml-3">
                    <p className="text-lg font-semibold">{username}</p>
                    <p className="text-gray-400 text-sm -mt-1">{fromNow(createdAt)}</p>
                </div>
                </div>
                {
                    user && user.username === username && <DeleteButton postId={id} /> 
                }
            </div>
            <p className="mt-5">{content}</p>
            <div className="flex justify-around mt-4">
                <LikeButton user={user} id={id} likes={likes} likeCount={likeCount} />
                {
                    user ? 
                    <Link to={`/post/${id}`} className="p-3 text-gray-400 flex hover:text-blue-500"> <ChatAlt2Icon className="h-6 w-6" /> <span className="ml-2">{commentCount}</span></Link> : 
                    <Link to='/login' className="p-3 text-gray-400 flex hover:text-blue-500"> <ChatAlt2Icon className="h-6 w-6" /> <span className="ml-2">{commentCount}</span></Link>
                }
            </div>
            </div>
        </div>
    )
}

export default Post
