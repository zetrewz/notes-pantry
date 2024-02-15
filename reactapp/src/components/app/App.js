import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import FolderList from '../folder/FolderList';
import FolderDetail from "../folder/FolderDetail";
import CreateFolder from "../folder/CreateFolder";
import {UserProvider} from "../user/UserProvider";

function App() {
    return (
            <UserProvider>
                <div>
                    <Router>
                        <div className="App">
                            <Routes>
                                <Route path="/" element={
                                    <>
                                        <FolderList/>
                                        <CreateFolder/>
                                    </>
                                }/>
                                <Route path="/folder/detail/:id" element={<FolderDetail/>}/>
                            </Routes>
                        </div>
                    </Router>
                </div>
            </UserProvider>
    );
}

export default App;