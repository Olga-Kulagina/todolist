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
    }
}