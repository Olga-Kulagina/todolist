import React from 'react';
import s from './Task.module.css'
import {Button, Checkbox} from 'antd';
import {DeleteTwoTone} from '@ant-design/icons';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriorities
    startDate: string
    status: TaskStatus
    title: string
    todoListId: string
}

type TaskPropsType = {
    title: string
    taskId: string
    todolistId: string
    deleteTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (status: TaskStatus, todolistId: string, taskId: string) => void
    status: TaskStatus
}


export const Task = React.memo((props: TaskPropsType) => {

    const onDeleteTaskClick = () => {
        props.deleteTask(props.taskId, props.todolistId)
    }

    const onCheckboxHandler = (e: CheckboxChangeEvent) => {
        let newIsDoneValue = e.target.checked
        props.changeTaskStatus(newIsDoneValue ? TaskStatus.Completed : TaskStatus.New, props.todolistId, props.taskId)
    }

    return (
        <div className={s.task}>
            <span>
                <Checkbox style={{margin: '0 10px 0 0'}} checked={props.status === TaskStatus.Completed}
                          onChange={onCheckboxHandler}/>
                {props.title}
            </span>
            <span>
                <Button onClick={onDeleteTaskClick} type='text' shape="circle" icon={<DeleteTwoTone/>}
                        size='middle'/>
            </span>
        </div>
    )
})
