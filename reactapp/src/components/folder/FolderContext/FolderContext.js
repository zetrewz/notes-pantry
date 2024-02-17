import React, {createContext, useContext, useState} from 'react';
import axios from "axios";

const FolderContext = createContext();

export function useFolders() {
    return useContext(FolderContext);
}

export const FolderProvider = ({children}) => {
    const [folders, setFolders] = useState([]);

    async function fetchFolders(){
        try {
            const response = await axios.get('http://localhost:8000/api/folder/list/');
            setFolders(response.data);
        } catch (error) {
            console.error("Ошибка при получении списка папок:", error);
        }
    }


    const value = {
        folders,
        fetchFolders,
    };

    return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
};
