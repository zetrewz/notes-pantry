import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function NoteDetail() {
    const [note, setNote] = useState('');
    const {id} = useParams();

    useEffect(() => {
        async function fetchNote() {
            try {
                const response = await axios.get(`http://localhost:8000/api/note/detail/${id}`)
                setNote(response.data)
            } catch (error) {
                console.log('nd: ', error.response)
            }
        }

        fetchNote();
    }, [id]);

    return (
            <div>
                {note.content}
            </div>
    )
}

export default NoteDetail;