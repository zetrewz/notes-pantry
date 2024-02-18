import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure, useToast} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";
import FolderDelete from "../FolderDelete/FolderDelete";


function FolderUpdate() {
    const [folderName, setFolderName] = useState('');
    const {id} = useParams();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();


    useEffect(() => {
        async function fetchFolder() {
            try {
                const response = await axios.get(`http://localhost:8000/api/folder/detail/${id}/`);
                setFolderName(response.data.name);
            } catch (error) {
                console.log('fu: ', error);
            }
        }

        fetchFolder();
    }, [id])


    async function handleSubmit() {
        try {
            await axios.patch(`http://localhost:8000/api/folder/update/${id}/`, {
                name: folderName
            });
            onClose();
        } catch (error) {
            console.log('fu: ', error);
            toast({
                title: "Ошибка сохранения папки",
                description: error.message,
                status: "error",
                duration: 1500,
                isClosable: true,
            });
        }
    }

    return (
            <div>
                <button onClick={onOpen}
                        className="group block mx-auto rounded-lg p-3 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 ">
                    <h3 className="text-slate-900 text-sm font-semibold">{folderName}</h3>
                </button>
                <Modal isOpen={isOpen} onClose={onClose} size="xs">
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
                            <FolderDelete/>
                            <button onClick={handleSubmit}>
                                <Icon as={CheckIcon}/>
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
    )
}

export default FolderUpdate;