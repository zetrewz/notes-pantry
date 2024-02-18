import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure, useToast} from "@chakra-ui/react";
import axios from "axios";
import {CheckIcon, DeleteIcon} from "@chakra-ui/icons";
import {useFolders} from "../FolderContext/FolderContext";

function FolderDelete() {
    const [folder, setFolder] = useState('');
    const {id} = useParams();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    const {fetchFolders} = useFolders();


    useEffect(() => {
        async function fetchFolder() {
            try {
                const response = await axios.get(`http://localhost:8000/api/folder/detail/${id}/`);
                setFolder(response.data);
            } catch (error) {
                console.log('fd: ', error);
            }
        }

        fetchFolder();
    }, [id])


    async function handleSubmit() {
        try {
            await axios.delete(`http://localhost:8000/api/folder/delete/${id}/`);
            onClose();
        } catch (error) {
            console.log('fd: ', error);
            toast({
                title: "Ошибка",
                description: error.message,
                status: "error",
                duration: 1500,
                isClosable: true,
            });
        }
    }

    return (
            <>
                <button onClick={onOpen} style={{marginRight: 'auto'}}>
                    <Icon as={DeleteIcon}/>
                </button>
                <Modal isOpen={isOpen} onClose={onClose} size="xs">
                    <ModalContent shadow="md" className={"items-center"} maxW={"70px"}>
                            <h2 className="text-slate-900 text-sm font-semibold">Уверен?</h2>
                        <ModalFooter>
                            <button onClick={handleSubmit}>
                                <Icon as={DeleteIcon}/>
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
    )
}

export default FolderDelete;