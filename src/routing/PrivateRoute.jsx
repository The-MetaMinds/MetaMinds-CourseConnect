import React from 'react'
import useAuth from '../hooks/useAuth'
import {Outlet, Navigate} from 'react-router-dom'
import Navbar from '../components/NavBar'
import "./Layout.css"

const PrivateRoute = () => {
    const {isAuthenticated} = useAuth()

    if (!isAuthenticated()){
        return <Navigate to='login' />
    }
    else{
        return <>
            <Navbar className="navbar-container" />
            <div className="main-container">
                <Outlet/>
            </div>
        </> 
    }
}

export default PrivateRoute