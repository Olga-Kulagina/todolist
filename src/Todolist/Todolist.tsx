import React, {useEffect} from 'react';
import {Task, TaskType} from '../Task/Task';
import s from './Todolist.module.css'
import {useDispatch} from 'react-redux';
import {fetchTasks} from '../redux/tasks-reducer';

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
}



export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks(props.id))
    }, [dispatch, props.id])

    return (
        <div className={s.todolist}>
            <div>
                {props.title}
            </div>
            <div>
                EditableSpan
            </div>
            <div>
                {
                    props.tasks.map((t) => {
                        return <Task key={t.id} title={t.title} taskId={t.id} todolistId={t.todoListId} />
                    })
                }
            </div>
            <div>
                Filter
            </div>
        </div>
    )
})