import React, {useCallback, useEffect, useState} from 'react';
import s from '../App.module.css';
import {AddItemForm} from '../common/AddItemForm/AddItemForm';
import {Col, Row} from 'antd';
import {Todolist, TodolistType} from '../Todolist/Todolist';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/redux-store';
import {addTaskTC, changeTaskStatusTC, deleteTaskTC, TasksStateType} from '../redux/tasks-reducer';
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from '../redux/todolists-reducer';
import {TaskStatus} from '../Task/Task';
import {PATH} from '../App';
import {Redirect} from 'react-router-dom';



export const Todolists = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(deleteTaskTC(taskId, todolistId))
    }, [dispatch])

    const addNewTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const changeTaskStatus = useCallback((status: TaskStatus, todolistId: string, taskId: string) => {
        dispatch(changeTaskStatusTC(status, todolistId, taskId))
    }, [dispatch])

    if(!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            <div className={s.addNewTodo}>
                <AddItemForm callback={addNewTodolist}/>
            </div>
            <div className="site-card-wrapper">
                <Row justify='center' gutter={16}>
                    {
                        todolists.map((tl) => {
                            let allTodolistTasks = tasks[tl.id]

                            return (
                                <Col xs={22} sm={12} md={10} lg={8} xl={6} xxl={6}>
                                    <Todolist key={tl.id} id={tl.id} title={tl.title}
                                              tasks={allTodolistTasks}
                                              deleteTask={removeTask} removeTodolist={removeTodolist}
                                              addTask={addTask} changeTaskStatus={changeTaskStatus}/>
                                </Col>
                            )
                        })}
                </Row>
            </div>
        </div>
    )
}