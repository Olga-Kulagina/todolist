import {Dispatch} from 'redux';
import {tasksAPI, UpdateTaskModelType} from '../api/todolosts-api';
import {TaskStatus, TaskType} from '../Task/Task';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {AppRootStateType} from './redux-store';

export type SetTasksActionType = ReturnType<typeof setTasks>
export type DeleteTaskActionType = ReturnType<typeof deleteTask>
export type AddTaskActionType = ReturnType<typeof addTask>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionType =
    SetTodolistsActionType
    | SetTasksActionType
    | DeleteTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType

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
        case 'REMOVE_TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'ADD_TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'ADD_TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'CHANGE_TASK_STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTasks = tasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'REMOVE_TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}

export const setTasks = (tasks: any, todolistId: any) => ({type: 'SET_TASKS', tasks, todolistId} as const)

export const deleteTask = (taskId: string, todolistId: string) => ({type: 'REMOVE_TASK', taskId, todolistId} as const)

export const addTask = (task: TaskType) => ({type: 'ADD_TASK', task} as const)

export const changeTaskStatusAC = (status: TaskStatus, todolistId: string, taskId: string) => (
    {type: 'CHANGE_TASK_STATUS', status, todolistId, taskId} as const)

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}

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
        tasksAPI.removeTask(todolistId, taskId)
            .then((res) => {
                dispatch(deleteTask(taskId, todolistId))
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.addTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTask(res.data.data.item))
                }
            })
    }
}

export const changeTaskStatusTC = (status: TaskStatus, todolistId: string, taskId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId]
        const currentTask = task.find((t) => {
            return t.id === taskId
        })

        if (currentTask) {
            const model: UpdateTaskModelType = {
                title: currentTask.title,
                description: currentTask.description,
                deadline: currentTask.deadline,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                status: status
            }
            tasksAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskStatusAC(status, todolistId, taskId))
                })
        }

    }
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId]
        const currentTask = task.find((t) => {
            return t.id === taskId
        })
        if (currentTask) {
            tasksAPI.updateTask(todolistId, taskId, {
                status: currentTask.status,
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                title: title
            }).then((res) => {
                dispatch(changeTaskTitleAC(taskId, title, todolistId))
            })
        }

    }