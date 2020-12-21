import React from 'react';

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
}

export const Task = React.memo((props: TaskPropsType) => {
    return (
        <div>
            <span>
                <input type='checkbox'/>
            </span>
            <span>
                {props.title}
            </span>
            <span>
                <button>X</button>
            </span>
        </div>
    )
})
