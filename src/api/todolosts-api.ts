import axios from 'axios'
import {TaskPriorities, TaskStatus, TaskType} from '../Task/Task';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '99efda20-dfa9-469b-8832-45007a73919e'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get('todo-lists')
    },
    addTodolist(title: string) {
        return instance.post(`todo-lists`, {title: title})
    },
    removeTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    removeTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>(`auth/login`, data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>(`auth/me`)
    }
}



export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}