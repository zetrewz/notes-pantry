import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import CreateNote from "../note/CreateNote";
import CreateFolder from "./CreateFolder";

function FolderDetail() {
    const {id} = useParams();
    const [folder, setFolder] = useState();

    useEffect(() => {
        async function fetchFolder() {
            try {
                const response = await axios.get(`http://localhost:8000/api/folder/detail/${id}/`);
                setFolder(response.data)
            } catch (error) {
                console.log('fd error:', error)
            }
        }

        fetchFolder();
    }, [id]);

    return (
            <div>
                {folder ?
                        <div>
                            <h2>{folder.name}</h2>
                            <CreateFolder/>
                            <CreateNote/>
                            <p>Folders:</p>
                            {folder.child_folders.map(child_folder => (
                                    <ol key={child_folder.id}>
                                        <Link to={`/folder/detail/${child_folder.id}`}>{child_folder.name.length > 20 ? child_folder.name.slice(0, 20) + '...' : child_folder.name}</Link>
                                    </ol>
                            ))}
                            <p>Notes:</p>
                            {folder.notes.map(note => (
                                    <ol key={note.id}>
                                        <Link to={`/note/detail/${note.id}`}>{note.content.length > 20 ? note.content.slice(0, 20) + '...' : note.content}</Link>
                                    </ol>
                            ))}
                        </div>
                        : <p>Загрузка...</p>}
            </div>
    );
}

export default FolderDetail;