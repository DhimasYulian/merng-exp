import {createContext, useReducer} from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

const token = localStorage.getItem("token")
if(token){ 
    const decodedToken = jwtDecode(token)

    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem("token")
    }else{
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (user) => {},
    logout: () => {}
})

const authReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: null}
        default:
            return state
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (user) => {
        dispatch({type: "LOGIN", payload: user})
        localStorage.setItem("token", user.token)
    } 
    const logout = () => {
        dispatch({type: "LOGOUT"})
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{user: state.user, login, logout}} {...props}/>
    )
}

export {AuthContext, AuthProvider}