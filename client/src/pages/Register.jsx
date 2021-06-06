import { useMutation } from '@apollo/client'
import { AtSymbolIcon, KeyIcon, UserIcon } from '@heroicons/react/outline'
import gql from 'graphql-tag'
import React, { useState, useContext } from 'react'

import {AuthContext} from '../context/auth'
import {useForm} from '../utils/hooks'

const Register = (props) => {
    const [errors, setErrors] = useState({})
    const {login} = useContext(AuthContext)
    const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const {handleChange, handleSubmit, values} = useForm(register, initialState)
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, {data: {register}}){
            login(register)
            props.history.push("/")
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function register (){
        addUser()
    } 

    const {username, email, password, confirmPasword} = values

    return (
        <div className="flex justify-center items-center mt-32">
            <div className="bg-blue-100 xs:w-3/4 lg:w-1/4 rounded-xl">
                <form onSubmit={handleSubmit} className="px-8 py-8">
                    <h1 className="font-bold text-xl">Register</h1>
                    <div className="flex items-center bg-gray-100 p-2 mt-5 w-full rounded-full">
                        <UserIcon className="h-5 text-gray-600 ml-2" />
                        <input name="username" value={username} onChange={handleChange} className="md:block flex items-center ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink" type="text" placeholder="Full Name" />
                    </div>
                    {
                        errors.username && <p className="text-red-500 text-xs my-1 ml-2">{errors.username}</p>
                    }
                    <div className="flex items-center bg-gray-100 p-2 mt-2 w-full rounded-full">
                        <AtSymbolIcon className="h-5 text-gray-600 ml-2" />
                        <input name="email" value={email} onChange={handleChange} className="md:block flex items-center ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink" type="text" placeholder="Email Address" />
                    </div>
                    {
                        errors.email && <p className="text-red-500 text-xs my-1 ml-2">{errors.email}</p>
                    }
                    <div className="flex items-center bg-gray-100 p-2 mt-2 w-full rounded-full">
                        <KeyIcon className="h-5 text-gray-600 ml-2" />
                        <input name="password" value={password} onChange={handleChange} className="md:block flex items-center ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink" type="password" placeholder="Password" />
                    </div>
                    {
                        errors.password && <p className="text-red-500 text-xs my-1 ml-2">{errors.password}</p>
                    }
                    <div className="flex items-center bg-gray-100 p-2 mt-2 w-full rounded-full">
                        <KeyIcon className="h-5 text-gray-600 ml-2" />
                        <input name="confirmPassword"  value={confirmPasword} onChange={handleChange} className="md:block flex items-center ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink" type="password" placeholder="Confirm Password" />
                    </div>
                    <button className="bg-blue-400 text-center min-w-full hover:bg-blue-600 text-white text-md mt-6 p-2 rounded-full" disabled={loading} type="submit">{loading ? "Loading..." : "Register"}</button>
                </form>
            </div>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register
