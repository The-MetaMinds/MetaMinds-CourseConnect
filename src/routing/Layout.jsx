import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "./Layout.css"


const Layout = () => {
    return (
        <>
            <Navbar className="navbar-container" />
            <div className="main-container">
                <Outlet/>
            </div>
        </>
    );
}

export default Layout