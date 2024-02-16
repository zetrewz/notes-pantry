import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import FolderList from '../folder/FolderList';
import FolderDetail from "../folder/FolderDetail";
import CreateFolder from "../folder/CreateFolder";
import {UserProvider} from "../user/UserProvider";
import CreateNote from "../note/CreateNote";
import NoteDetail from "../note/NoteDetail";
import {ChakraProvider} from "@chakra-ui/react";

function App() {
    return (
            <ChakraProvider>
                <UserProvider>
                    <div>
                        <Router>
                            <div className="App">
                                <Routes>
                                    <Route path="/" element={
                                        <>
                                            <FolderList/>
                                            <CreateFolder/>
                                            <CreateNote/>
                                        </>
                                    }/>
                                    <Route path="/folder/detail/:id" element={<FolderDetail/>}/>
                                    <Route path="/note/detail/:id" element={<NoteDetail/>}/>
                                </Routes>
                            </div>
                        </Router>
                    </div>
                </UserProvider>
            </ChakraProvider>
    );
}

export default App;