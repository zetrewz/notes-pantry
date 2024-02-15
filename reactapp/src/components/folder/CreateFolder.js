import React, {useState} from 'react';
import axios from 'axios';
import {useUser} from '../user/UserProvider';

function CreateFolder() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    const { currentUser } = useUser();

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    const handleSubmit = async () => {
        if (!currentUser) {
            console.error('Пользователь не аутентифицирован или данные еще не загружены');
            return;
        }
        try {
            await axios.post('http://localhost:8000/api/folder/create/', {
                user: currentUser.id, name: folderName
            });
            setIsModalOpen(false);
            setFolderName('');
        } catch (error) {
            console.error('Error alo alo', error)
        }
    };
    return (
            <>
                <button onClick={handleOpenModal}>Создать папку</button>
                {isModalOpen && (
                        <div className="modal">
                            <input
                                    type={"text"}
                                    placeholder="Введите название"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                            />
                            <button onClick={handleSubmit}>Создать</button>
                        </div>
                )}
            </>
    );
}

export default CreateFolder;