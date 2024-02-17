import React, {useState} from 'react';
import axios from 'axios';
import {useUser} from '../../user/UserProvider';
import {useLocation} from "react-router-dom";
import styles from "./FolderCreate.module.css";
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Input,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import {useFolders} from "../FolderContext/FolderContext";


function FolderCreate() {
    const location = useLocation();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [folderName, setFolderName] = useState('');
    const {currentUser} = useUser();
    const toast = useToast();
    const {fetchFolders} = useFolders();

    async function handleSubmit() {
        if (!currentUser) {
            console.error('Пользователь не аутентифицирован или данные еще не загружены');
            return;
        }

        const folderIdRegex = /\/folder\/detail\/(\d+)/;
        const match = location.pathname.match(folderIdRegex);
        const folderId = match ? match[1] : null;

        const postData = {
            user: currentUser.id,
            name: folderName,
        };

        if (folderId) {
            postData.parent_folder = folderId;
        }

        try {
            await axios.post('http://localhost:8000/api/folder/create/', postData);
            onClose();
            setFolderName('');
            toast({
                title: "Папка создана",
                description: "Ваша папка успешно создана.",
                status: "success",
                duration: 1700,
                isClosable: true,
            });
        } catch (error) {
            console.error('Ошибка при создании папки: ', error);
            toast({
                title: "Ошибка создания папки",
                description: error.message,
                status: "error",
                duration: 1500,
                isClosable: true,
            });
        }
        fetchFolders();
    }

    function handleClose() {
        setFolderName('');
        onClose();
    }

    return (
            <div className={styles.btnDiv}>
                <button onClick={onOpen}
                        className="group block max-w-36 mx-auto rounded-lg p-3 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:ring-sky-500 ">
                    <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"/>
                        </svg>
                        <h3 className="text-slate-900 text-sm font-semibold">New folder</h3>
                    </div>
                </button>
                <Modal isOpen={isOpen} onClose={handleClose} size="xs">
                    <ModalContent shadow="md">
                        <ModalBody>
                            <Input
                                    focusBorderColor="black"
                                    htmlSize={30}
                                    width='auto'
                                    variant='flushed'
                                    placeholder="Введите название"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={handleSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                </svg>
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
    );
}

export default FolderCreate;