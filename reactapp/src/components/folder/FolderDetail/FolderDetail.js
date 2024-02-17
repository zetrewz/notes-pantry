import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import NoteCreate from "../../note/NoteCreate/NoteCreate";
import FolderCreate from "../FolderCreate/FolderCreate";
import {useFolders} from "../FolderContext/FolderContext";

function FolderDetail() {
    const {id} = useParams();
    const [folder, setFolder] = useState();
    const {fetchFolders} = useFolders();

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
    }, [id, fetchFolders]);

    return (
            <>
                <span>{folder ? folder.name : <p>Загрузка...</p>}</span>
                <FolderCreate/>
                <NoteCreate/>
                {folder ?
                        <div className={"flex flex-wrap gap-x-6 ml-6"}>
                            {folder.child_folders.map(child_folder => (
                                    <button key={child_folder.id}
                                            className="bg-gray-200 p-2 rounded-lg flex items-center space-x-2 mt-4 w-32">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5"
                                             stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"/>
                                        </svg>
                                        <h3 className="text-slate-900 font-semibold">
                                            <Link to={`/folder/detail/${child_folder.id}`}>{child_folder.name.length > 8 ? child_folder.name.slice(0, 8) + '...' : child_folder.name}</Link>
                                        </h3>
                                    </button>
                            ))}
                            <h2>{folder.name}</h2>
                        </div>
                        : <p>Загрузка...</p>}
            </>
    );
}

export default FolderDetail;