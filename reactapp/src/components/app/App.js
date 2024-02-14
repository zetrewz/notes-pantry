import React from 'react';
import './App.css'
import BaseC from '../base/BaseC';
import ButtonC from '../base/ButtonC'
import FolderList from '../folder/FolderList';
import CreateFolder from '../folder/CreateFolder';

function App() {
    return (
            <div className="App">
                <FolderList/>
                <CreateFolder/>
            </div>
    );
}

export default App;