import {Dispatch} from 'redux';
import {tasksAPI} from '../api/todolosts-api';
import {TaskType} from '../Task/Task';
import {SetTodolistsActionType} from './todolists-reducer';

export type SetTasksActionType = ReturnType<typeof setTasks>

type ActionType = SetTodolistsActionType | SetTasksActionType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: any = []

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET_TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET_TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const setTasks = (tasks: any, todolistId: any) => ({type: 'SET_TASKS', tasks, todolistId} as const)

export const fetchTasks = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasks(res.data.items, todolistId))
            })

    }
}