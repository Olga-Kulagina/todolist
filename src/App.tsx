import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import './App.css';
import {tasksAPI, todolistsAPI} from './api/todolosts-api';
import {Task} from './Task/Task';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                console.log(res.data[3])
            })
    }, [])


    useEffect(() => {
        tasksAPI.getTasks()
            .then((res) => {
                console.log(res.data.items[0])
            })
    }, [])


    return (
        <div className="App">
            <Task title={'dfdf'}/>
        </div>
    );
}

export default App;
