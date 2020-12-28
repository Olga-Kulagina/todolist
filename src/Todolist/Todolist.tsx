import React from 'react';
import {Task} from '../Task/Task';
import s from './Todolist.module.css'

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TodolistPropsType = {
    title: string
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    return (
        <div className={s.todolist}>
            <div>
                {props.title}
            </div>
            <div>
                EditableSpan
            </div>
            <div>
                <Task title={'aaaaaa'} />
                <Task title={'bbbbbbb'} />
                <Task title={'vvvvvvv'} />
            </div>
            <div>
                Filter
            </div>
        </div>
    )
})