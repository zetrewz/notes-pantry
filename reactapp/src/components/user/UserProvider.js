import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const response = await axios.get('http://localhost:8000//api/get_current_user/', {withCredentials: true});
                // console.log("Полученные данные пользователя:", response.data);
                setCurrentUser(response.data);
            } catch (error) {
                console.error("Ошибка при получении данных пользователя", error);
            }
        }

        fetchCurrentUser();
    }, []);

    return (
            <UserContext.Provider value={{currentUser, setCurrentUser}}>
                {children}
            </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);