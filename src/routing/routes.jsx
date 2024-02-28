import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/HomePage";
import Registration from "../components/registration";
import ClassPage from "../components/ClassPage";
import LoginPage from "../components/LoginPage";
import ProfilePage from "../components/ProfilePage";
import Layout from "./Layout";

const router = createBrowserRouter([
    {
        path : '/', 
        element : <Layout />,
        children: [
            {index : true, element : <HomePage />},
            {path : 'registration', element :  <Registration />},
            {path : 'class', element : <ClassPage />},
            {path : 'login', element : <LoginPage />},
            {path : 'profile', element : <ProfilePage />}
        ]
    },
    
]);

export default router;