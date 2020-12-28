import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {tasksAPI, todolistsAPI} from './api/todolosts-api';
import {Task} from './Task/Task';
import {Todolist, TodolistType} from './Todolist/Todolist';
import {fetchTodolists} from './redux/todolists-reducer';
import {AppRootStateType} from './redux/redux-store';

function App() {
    const dispatch = useDispatch()

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    useEffect(() => {
        dispatch(fetchTodolists())
    }, [dispatch])

    // const todolists: any = useSelector<AppRootStateType>(state => state.todolists)

    /*    useEffect(() => {
            tasksAPI.getTasks()
                .then((res) => {
                    console.log(res.data.items[0])
                })
        }, [])*/

//
// let todos = [
//     {id: 1, title: 'a'},
//     {id: 2, title: 'b'}
// ]
//
//     console.log(todos)


    return (
        <div className="App">
            <div>
                {
                    todolists.map((tl) => {
                        return (
                                <Todolist key={tl.id} title={tl.title}/>
                        )
                    })}
            </div>



        </div>
    );
}

export default App;
