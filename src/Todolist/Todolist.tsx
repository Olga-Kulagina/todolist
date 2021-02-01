import React, {useEffect} from 'react';
import {Task, TaskStatus, TaskType} from '../Task/Task';
import s from './Todolist.module.css'
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../redux/tasks-reducer';
import {AddItemForm} from '../common/AddItemForm/AddItemForm';
import {DeleteTwoTone} from '@ant-design/icons';
import {Button, Card} from 'antd';

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (status: TaskStatus, todolistId: string, taskId: string) => void
    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
}


export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [dispatch, props.id])

    const onDeleteTodolistClick = () => {
        props.removeTodolist(props.id)
    }
    const addTaskClick = (title: string) => {
        props.addTask(title, props.id)
    }


    return (
        <div className={s.todolist}>

            <Card title={props.title} bordered={false}
                  extra={<Button onClick={onDeleteTodolistClick} type='text' shape="circle"
                                 icon={<DeleteTwoTone/>} size='large'/>}
                  style={{margin: '20px 0'}}
            >
                <AddItemForm callback={addTaskClick}/>
                <div>
                    {
                        props.tasks.map((t) => {
                            return <Task key={t.id} title={t.title} taskId={t.id} todolistId={t.todoListId}
                                         deleteTask={props.deleteTask} changeTaskStatus={props.changeTaskStatus}
                                         status={t.status}/>
                        })
                    }
                </div>
                <div>
                    <Button>All</Button>
                    <Button>Active</Button>
                    <Button>Completed</Button>
                </div>
            </Card>
        </div>

    )
})