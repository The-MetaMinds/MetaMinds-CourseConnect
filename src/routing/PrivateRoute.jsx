import React from 'react'
import useAuth from '../hooks/useAuth'
import {Outlet, Navigate} from 'react-router-dom'
import Navbar from '../components/NavBar'

const PrivateRoute = () => {
    const {isAuthenticated} = useAuth()

    if (!isAuthenticated()){
        return <Navigate to='login' />
    }
    else{
        return <>
            <Navbar />
            <Outlet/>
        </> 
    }
}

export default PrivateRoute