import React, {useEffect, useState} from 'react';
import axios from 'axios';

function FolderList() {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/folder/list/');
                setFolders(response.data);
            } catch (error) {
                console.error("Ошибка при получении списка папок:", error);
            }
        };

        fetchFolders();
    }, []);

    return (
            <div>
                <ul>
                    {folders.map(folder => (
                            <li key={folder.id}>{folder.name}</li>
                    ))}
                </ul>
            </div>
    );
}

export default FolderList;