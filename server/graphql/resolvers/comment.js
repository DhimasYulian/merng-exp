const {UserInputError, AuthenticationError} = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')

const commentResolver = {
    Mutation: {
        createComment: async(_, {postId, content}, context) => {
            const {username} = checkAuth(context)
            try {
                if(content.trim() === "") {
                    throw new UserInputError("Empty Content", {
                        "errors": {
                            content: "Comment can't be empty"
                        }
                    })
                }
                const post = await Post.findById(postId)
                if(post){
                    post.comments.unshift({
                        content,
                        username,
                        createdAt: new Date().toISOString()
                    })
                    await post.save()
                    return post
                }else{
                    throw new UserInputError("Post not found")
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        deleteComment: async (_, {postId, commentId}, context) =>{
            const {username} = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if(post){
                    const commentIdx = post.comments.findIndex(c => c.id === commentId)
    
                    if(username === post.comments[commentIdx].username){
                        post.comments.splice(commentIdx, 1)
                        await post.save()
                        return post
                    }else{
                        throw new AuthenticationError("Action not allowed")
                    }
                }else{
                    throw new UserInputError("Post not found")
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

module.exports = commentResolver