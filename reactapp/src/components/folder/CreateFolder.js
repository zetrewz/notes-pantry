import React, {useState} from 'react';
import axios from 'axios';

function CreateFolder() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const folderData = {
            user: 1,
            name: inputValue,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/folder/create/', folderData);
            console.log(response.data);
            setInputValue('');
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    return (
            <form onSubmit={handleSubmit}>
                <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                />
                <button type="submit">Отправить</button>
            </form>
    );
}


export default CreateFolder;