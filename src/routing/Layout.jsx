import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "./Layout.css"
import useAuth from "../hooks/useAuth";
import {jwtDecode} from 'jwt-decode';


const Layout = () => {
    const { authToken } = useAuth()

    // Decode the authentication token to extract user ID
    const userId = authToken ? jwtDecode(authToken).userId.id : null; 

    return (
        <>
            <Navbar className="navbar-container" userId={userId} />
            <div className="main-container">
                <Outlet/>
            </div>
        </>
    );
}

export default Layout