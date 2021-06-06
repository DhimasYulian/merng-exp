import {InMemoryCache, createHttpLink, ApolloProvider, ApolloClient} from '@apollo/client'
import {setContext} from 'apollo-link-context'
import App from './App'

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URI
})

const authLink = setContext(() => {
    const token = localStorage.getItem("token")
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()

})

const Provider = () => {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}

export default Provider
