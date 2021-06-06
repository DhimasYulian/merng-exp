const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    content: String,
    username: String,
    createdAt: String,
    comments: [
        {
            content: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

module.exports = model("Post", postSchema)