import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { AuthContext } from '../context/auth'

const Navbar = () => {
    const {user, logout} = useContext(AuthContext)
    const history = useHistory()
    const logoutUser = () => {
        history.push("/")
        logout()
    }
    return (
        <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
            <div className="container mx-auto flex justify-between items-center max-w-[1000px]">
                <Link to="/" className="flex items-center">
                    <img src="/assets/logo.png" width={40} alt="" />
                    <h1 className="text-2xl font-bold ml-3 ">Hello</h1>
                </Link>
                <div hidden={user}>
                    <Link to="/register" className="no-underline text-center px-5 py-2  text-blue-400 hover:bg-blue-100 hover:text-blue-500 rounded-md mr-2">Register</Link>
                    <Link to="/login" className="no-underline text-center px-5 py-2 bg-blue-400 text-white hover:bg-blue-500 rounded-md">Login</Link>
                </div>
                <div className="flex items-center cursor-pointer" style={{display: user ? "flex" : "none"}} onClick={logoutUser}>
                    <img className="rounded-full w-10 h-10" src="/assets/default_avatar.jpg"  alt="" />
                    <div className="ml-3">
                        <p className="text-lg font-semibold">{user && user.username}</p>
                        <p className="text-gray-400 text-sm -mt-1">{user && user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
