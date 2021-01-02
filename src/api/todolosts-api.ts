import axios from 'axios'

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
    createTodolist(title: string) {
        return instance.post(`todo-lists`, {title: title})
    },
    removeTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title})
    }
}