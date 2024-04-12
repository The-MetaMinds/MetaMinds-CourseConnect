import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "./Layout.css"


const LoginSignupRoute = () => { 

    const isAuthenticated = () => {
        return false;
    }

    return (
        <>
            <Navbar className="navbar-container" userId={null} isAuthenticated={isAuthenticated} />
            <div className="main-container">
                <Outlet/>
            </div>
        </>
    );
}

export default LoginSignupRoute