import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";

function FolderDetail() {
    const {id} = useParams();
    const [folder, setFolder] = useState();

    useEffect(() => {
        const fetchFolder = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/folder/detail/${id}/`);
                setFolder(response.data)
            } catch (error) {
                console.log('fd error:', error)
            }
        };
        fetchFolder();
    }, [id]);

    return (
            <div>
                {folder ?
                        <div>
                            <h2>{folder.name}</h2>
                            {folder.notes.map(note => (
                                    <ol key={note.id}>
                                        {note.content}
                                    </ol>
                            ))}
                        </div>
                        : <p>Загрузка...</p>}
            </div>
    );
}

export default FolderDetail;