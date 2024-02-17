import React, {useState} from "react";
import axios from "axios";
import {useUser} from "../../user/UserProvider";
import {useLocation} from "react-router-dom";
import styles from "./NoteCreate.module.css";

import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Input,
    useDisclosure,
    useToast
} from '@chakra-ui/react';


function NoteCreate() {
    const location = useLocation();
    const [noteContent, setNoteContent] = useState('');
    const {currentUser} = useUser();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();

    async function handleSubmit() {
        if (!currentUser) {
            console.error('Пользователь не аутентифицирован или данные еще не загружены');
            return;
        }

        const folderIdRegex = /\/folder\/detail\/(\d+)/;
        const match = location.pathname.match(folderIdRegex);
        console.log(location.pathname)
        const folderId = match ? match[1] : null;

        const postData = {
            user: currentUser.id,
            content: noteContent,
        };

        if (folderId) {
            postData.folder = folderId;
        }

        console.log(postData)

        try {
            await axios.post('http://localhost:8000/api/note/create/', postData);
            onClose();
            setNoteContent('');
            toast({
                title: "Заметка создана",
                description: "Ваша заметка успешно создана.",
                status: "success",
                duration: 1700,
                isClosable: true,
            })
        } catch (error) {
            console.error('cn: ', error.response);
            toast({
                title: "Ошибка создания заметки",
                description: error.message,
                status: "error",
                duration: 1500,
                isClosable: true,
            });
        }
    }

    function handleClose() {
        setNoteContent('')
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
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                        </svg>
                        <h3 className="text-slate-900 text-sm font-semibold">New note</h3>
                    </div>
                </button>
                <Modal isOpen={isOpen} onClose={handleClose} size={'xs'}>
                    <ModalContent shadow="md">
                        <ModalBody>
                            <Input
                                    focusBorderColor="black"
                                    htmlSize={30}
                                    width="auto"
                                    variant="flushed"
                                    placeholder="Введите содержимое"
                                    onChange={(e) => setNoteContent(e.target.value)}
                                    value={noteContent}
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
    )
}

export default NoteCreate;