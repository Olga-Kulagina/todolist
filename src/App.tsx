import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {Todolist, TodolistType} from './Todolist/Todolist';
import {addTodolistTC, fetchTodolists} from './redux/todolists-reducer';
import {AppRootStateType} from './redux/redux-store';
import {deleteTaskTC, TasksStateType} from './redux/tasks-reducer';
import {AddItemForm} from './common/AddItemForm/AddItemForm';

const App = () => {
    const dispatch = useDispatch()

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [dispatch])

    const deleteTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(deleteTaskTC(taskId, todolistId))
    }, [dispatch])

    const addNewTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])


    return (
        <div className="App">
            <div>
                <AddItemForm callback={addNewTodolist}/>
                {
                    todolists.map((tl) => {
                        let allTodolistTasks = tasks[tl.id]

                        return (
                            <Todolist key={tl.id} id={tl.id} title={tl.title} tasks={allTodolistTasks}
                                      deleteTask={deleteTask}/>
                        )
                    })}
            </div>


        </div>
    );
}

export default App;
