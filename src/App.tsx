import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {tasksAPI, todolistsAPI} from './api/todolosts-api';
import {Task, TaskType} from './Task/Task';
import {Todolist, TodolistType} from './Todolist/Todolist';
import {fetchTodolists} from './redux/todolists-reducer';
import {AppRootStateType} from './redux/redux-store';
import {TasksStateType} from './redux/tasks-reducer';

const App = () => {
    const dispatch = useDispatch()

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [dispatch])


    return (
        <div className="App">
            <div>
                {
                    todolists.map((tl) => {
                        let allTodolistTasks = tasks[tl.id]

                        return (
                            <Todolist key={tl.id} id={tl.id} title={tl.title} tasks={allTodolistTasks}/>
                        )
                    })}
            </div>


        </div>
    );
}

export default App;
