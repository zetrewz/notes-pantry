import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function FolderList() {
    const [folders, setFolders] = useState([]);

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
    }, []);

    return (
            <div>
                {folders.map(folder => (
                        <ol key={folder.id}>
                            {<Link to={`/folder/detail/${folder.id}`}>{folder.name}</Link>}
                        </ol>
                ))}
            </div>
    );
}

export default FolderList;
