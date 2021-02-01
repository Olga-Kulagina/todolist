import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Todolist, TodolistType} from './Todolist/Todolist';
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from './redux/todolists-reducer';
import {AppRootStateType} from './redux/redux-store';
import {addTaskTC, changeTaskStatusTC, deleteTaskTC, TasksStateType} from './redux/tasks-reducer';
import {AddItemForm} from './common/AddItemForm/AddItemForm';
import {Col, Layout, Row} from 'antd';
import s from './App.module.css'
import {TaskStatus} from './Task/Task';


const App = () => {
    const dispatch = useDispatch()

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

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

    const {Header, Content, Footer} = Layout;

    return (
        <div className="App">

            <Layout className="layout">
                <Header>

                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div className="site-layout-content">
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
                                                <Col span={6}>
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
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Todolist</Footer>
            </Layout>


        </div>
    );
}

export default App;
