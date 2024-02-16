import React, {useEffect, useState} from "react";
import axios from "axios";
import {useUser} from "../user/UserProvider";
import {useLocation} from "react-router-dom";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    useDisclosure,
    useToast
} from '@chakra-ui/react';


function CreateNote() {
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
            <div>
                <Button onClick={onOpen} colorScheme="yellow">Создать заметку</Button>
                <Modal isOpen={isOpen} onClose={handleClose} size={'xs'}>
                    <ModalContent>
                        <ModalHeader>Создать новую заметку</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Input
                                    textAlign='center'
                                    ml={55}
                                    htmlSize={14}
                                    width="auto"
                                    variant="flushed"
                                    placeholder="Введите название"
                                    onChange={(e) => setNoteContent(e.target.value)}
                                    value={noteContent}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleSubmit} colorScheme="blue" mr={24}>Создать</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
    )
}

export default CreateNote;