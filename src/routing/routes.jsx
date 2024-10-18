import { createBrowserRouter } from "react-router-dom";
//import HomePage from "../components/HomePage";
import Registration from "../components/registration";
import ClassPage from "../components/ClassPage";
import LoginPage from "../components/LoginPage";
import ProfilePage from "../components/ProfilePage";
import Layout from "./Layout";
import HomePage from "../components/HomePage";
import PrivateRoute from "./PrivateRoute";
import LoginSignupRoute from "./LoginSignupRoute";
import ChatPage from "../components/ChatPage";


const router = createBrowserRouter([
    {
        path : '/', 
        element : <Layout />,
        children: [
            {index : true, element : <HomePage />}
        ]
    },
    {
        element : <LoginSignupRoute />,
        children: [
            {path : 'registration', element :  <Registration />},
            {path : 'login', element : <LoginPage />},
        ]

    },
    {
        element : <PrivateRoute />,
        children :[
            {path : 'class', element : <ClassPage />},
            {path : 'profile/:userID', element : <ProfilePage/>},
            {path : 'classpage/:departmentID', 
                element : <ClassPage />
            },
            {path : 'chat', 
                element : <ChatPage />
            }
        ]
    }
    
]);

export default router;