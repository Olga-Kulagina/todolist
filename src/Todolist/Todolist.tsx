import React, {useEffect} from 'react';
import {Task, TaskType} from '../Task/Task';
import s from './Todolist.module.css'
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../redux/tasks-reducer';
import {AddItemForm} from '../common/AddItemForm/AddItemForm';

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
        props.addTask(title ,props.id)
    }

    return (
        <div className={s.todolist}>
            <AddItemForm callback={addTaskClick} />
            <div>
                {props.title}
                <button onClick={onDeleteTodolistClick}>X</button>
            </div>
            <div>

            </div>
            <div>
                {
                    props.tasks.map((t) => {
                        return <Task key={t.id} title={t.title} taskId={t.id} todolistId={t.todoListId}
                        deleteTask={props.deleteTask}/>
                    })
                }
            </div>
            <div>
                Filter
            </div>
        </div>
    )
})