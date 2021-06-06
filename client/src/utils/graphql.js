import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id 
            username 
            content 
            createdAt
            comments{
                id
                content
                username
                createdAt
            }
            likes{
                id
                username
                createdAt
            }
            likeCount
            commentCount
        }
    }
`