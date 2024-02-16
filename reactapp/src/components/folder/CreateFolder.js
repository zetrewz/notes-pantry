import React, {useState} from 'react';
import axios from 'axios';
import {useUser} from '../user/UserProvider';
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


function CreateFolder() {
    const location = useLocation();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [folderName, setFolderName] = useState('');
    const {currentUser} = useUser();
    const toast = useToast();

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
    }

    function handleClose() {
        setFolderName('');
        onClose();
    }

    return (
            <div>
                <Button onClick={onOpen} colorScheme='orange'>Создать папку</Button>
                <Modal isOpen={isOpen} onClose={handleClose} size="xs">
                    <ModalContent>
                        <ModalHeader>Создать новую папку</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Input
                                    textAlign='center'
                                    marginLeft={55}
                                    htmlSize={14}
                                    width='auto'
                                    variant='flushed'
                                    placeholder="Введите название"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={24} onClick={handleSubmit}>
                                Создать
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
    );
}

export default CreateFolder;