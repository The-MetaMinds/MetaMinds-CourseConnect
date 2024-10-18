import React, { createContext, useContext, useEffect, useState } from 'react';

import {jwtDecode} from 'jwt-decode';
import useAuth from '../hooks/useAuth'


const userContext = createContext();

const UserProvider = ({ children }) => {
    const auth = useAuth();
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])

    return (
        <userContext.Provider value={{auth, selectedChat, setSelectedChat, chats, setChats}}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => {
    return useContext(userContext);
};

export default UserProvider;
