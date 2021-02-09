import React, {useEffect, useState} from 'react';
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
export type FilterType = 'all' | 'completed' | 'active'


export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useDispatch()

    const [filter, setFilter] = useState<FilterType>('all')

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [dispatch, props.id])

    const onDeleteTodolistClick = () => {
        props.removeTodolist(props.id)
    }
    const addTaskClick = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllFilter = () => {
        setFilter('all')
    }
    const onActiveFilter = () => {
        setFilter('active')
    }
    const onCompletedFilter = () => {
        setFilter('completed')
    }

    let filteredTasks = props.tasks

    if (filter === 'active') {
        filteredTasks = props.tasks.filter(t => t.status !== TaskStatus.Completed)
    }
    if (filter === 'completed') {
        filteredTasks = props.tasks.filter(t => t.status === TaskStatus.Completed)
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
                        filteredTasks.map((t) => {
                            return <Task key={t.id} title={t.title} taskId={t.id} todolistId={t.todoListId}
                                         deleteTask={props.deleteTask} changeTaskStatus={props.changeTaskStatus}
                                         status={t.status}/>
                        })
                    }
                </div>
                <div>
                    <Button type={filter === 'all' ? 'primary' : 'default'} onClick={onAllFilter}>All</Button>
                    <Button type={filter === 'active' ? 'primary' : 'default'} onClick={onActiveFilter}>Active</Button>
                    <Button type={filter === 'completed' ? 'primary' : 'default'} onClick={onCompletedFilter}>Completed</Button>
                </div>
            </Card>
        </div>

    )
})