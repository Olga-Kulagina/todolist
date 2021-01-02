import {Dispatch} from 'redux';
import {tasksAPI} from '../api/todolosts-api';
import {TaskType} from '../Task/Task';
import {AddTodolistActionType, SetTodolistsActionType} from './todolists-reducer';

export type SetTasksActionType = ReturnType<typeof setTasks>
export type DeleteTaskActionType = ReturnType<typeof deleteTask>

type ActionType = SetTodolistsActionType | SetTasksActionType | DeleteTaskActionType | AddTodolistActionType

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
        case 'DELETE_TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'ADD_TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        default:
            return state
    }
}

export const setTasks = (tasks: any, todolistId: any) => ({type: 'SET_TASKS', tasks, todolistId} as const)

export const deleteTask = (taskId: string, todolistId: string) => ({type: 'DELETE_TASK', taskId, todolistId} as const)

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasks(tasks, todolistId))
            })

    }
}

export const deleteTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(deleteTask(taskId, todolistId))
            })
    }
}