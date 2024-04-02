import React from 'react'
import useAuth from '../hooks/useAuth'
import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoute = () => {
    const {isAuthenticated} = useAuth()

    if (!isAuthenticated()){
        return <Navigate to='login' />
    }
    else{
        return <Outlet/>
    }
}

export default PrivateRoute