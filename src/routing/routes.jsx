import { createBrowserRouter } from "react-router-dom";
//import HomePage from "../components/HomePage";
import Registration from "../components/registration";
import ClassPage from "../components/ClassPage";
import LoginPage from "../components/LoginPage";
import ProfilePage from "../components/ProfilePage";
import Layout from "./Layout";
import HomePage from "../components/HomePage";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
        path : '/', 
        element : <Layout />,
        children: [
            {index : true, element : <HomePage />},
            {path : 'registration', element :  <Registration />},
            {path : 'login', element : <LoginPage />},
        ]
    },
    {
        element : <PrivateRoute />,
        children :[
            {path : 'class', element : <ClassPage />},
            {path : 'profile', element : <ProfilePage />},
            {path : 'classpage/:departmentID', element : <ClassPage/>}

        ]
    }
    
]);

export default router;