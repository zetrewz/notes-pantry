import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useFolders} from "../FolderContext/FolderContext";


function FolderList() {
    const [folders, setFolders] = useState([]);
    const { fetchFolders } = useFolders();

    useEffect(() => {
        async function fetchFolders() {
            try {
                const response = await axios.get('http://localhost:8000/api/folder/list/');
                setFolders(response.data);
            } catch (error) {
                console.error("Ошибка при получении списка папок:", error);
            }
        }

        fetchFolders();
    }, [fetchFolders]);

    return (
            <div className={"flex flex-wrap gap-x-6 ml-6"}>
                {folders.map(folder => (
                        <Link to={`/folder/detail/${folder.id}`} key={folder.id} className="bg-gray-200 p-2 rounded-lg flex items-center space-x-2 mt-4 w-32">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"/>
                            </svg>
                            <h3 className="text-slate-900 font-semibold">
                                {folder.name.length > 8 ? folder.name.slice(0, 8) + '...' : folder.name}
                            </h3>
                        </Link>
                ))}
            </div>
    );
}

export default FolderList;
