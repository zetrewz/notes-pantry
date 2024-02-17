import React, {useEffect, useState} from 'react';
import axios from 'axios';


function NoteList() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        async function fetchNotes() {
            try {
                const response = await axios.get('http://localhost:8000/api/note/list/');
                setNotes(response.data);
            } catch (error) {
                console.log('nl error:', error);
            }
        }

        fetchNotes();
    }, []);
    return (
            <>
                <ul>
                    {notes.map(note => (
                            <li key={note.id}>
                                {note.content}
                            </li>
                    ))}
                </ul>
            </>
    );
}

export default NoteList;