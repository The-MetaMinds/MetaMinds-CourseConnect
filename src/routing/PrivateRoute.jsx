import React from 'react'
import useAuth from '../hooks/useAuth'
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from '../components/NavBar'
import "./Layout.css"
import {jwtDecode} from 'jwt-decode'; // Import jwt_decode from jwt-decode library

const PrivateRoute = () => {
    const { authToken, isAuthenticated, logout } = useAuth()

    // Decode the authentication token to extract user ID
    const userId = authToken ? jwtDecode(authToken).userId.id : null; 

    if (!isAuthenticated()) {
        return <Navigate to='login' />
    } else {
        return (
            <>
                <Navbar className="navbar-container" userId={userId} onLogout={logout} isAuthenticated={isAuthenticated} />
                <div className="main-container">
                    <Outlet userId={userId}/>
                </div>
            </>
        );
    }
}

export default PrivateRoute
