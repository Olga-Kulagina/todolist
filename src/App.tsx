import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import './App.css';
import {todolistsAPI} from './api/todolosts-api';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {console.log(res)})
    }, [])

    return (
        <div className="App">
            Hello
        </div>
    );
}

export default App;
