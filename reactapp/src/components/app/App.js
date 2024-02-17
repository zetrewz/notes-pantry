import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import FolderList from '../folder/FolderList/FolderList';
import FolderDetail from "../folder/FolderDetail/FolderDetail";
import FolderCreate from "../folder/FolderCreate/FolderCreate";
import {UserProvider} from "../user/UserProvider";
import NoteCreate from "../note/NoteCreate/NoteCreate";
import NoteDetail from "../note/NoteDetail/NoteDetail";
import {ChakraProvider} from "@chakra-ui/react";
import {FolderProvider} from "../folder/FolderContext/FolderContext";

function App() {
    return (
            <ChakraProvider>
                <UserProvider>
                    <FolderProvider>
                        <div>
                            <Router>
                                <div className="App">
                                    <Routes>
                                        <Route path="/" element={
                                            <>
                                                <FolderCreate/>
                                                <NoteCreate/>
                                                <FolderList/>
                                            </>
                                        }/>
                                        <Route path="/folder/detail/:id" element={<FolderDetail/>}/>
                                        <Route path="/note/detail/:id" element={<NoteDetail/>}/>
                                    </Routes>
                                </div>
                            </Router>
                        </div>
                    </FolderProvider>
                </UserProvider>
            </ChakraProvider>
    );
}

export default App;