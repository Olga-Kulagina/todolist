import {TodolistType} from '../Todolist/Todolist';
import {Dispatch} from 'redux';
import {todolistsAPI} from '../api/todolosts-api';

export type SetTodolistsActionType = ReturnType<typeof setTodolists>
export type AddTodolistActionType = ReturnType<typeof addTodolist>

type ActionType = SetTodolistsActionType | AddTodolistActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'SET_TODOLISTS': {
            return action.todolists
        }
        case 'ADD_TODOLIST': {
            const newTodolist: TodolistType = {
                title: action.title,
                id: action.todolistId,
                addedDate: '',
                order: 0
            }
            return [newTodolist, ...state]
        }
        default:
            return state
    }
}

export const setTodolists = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLISTS', todolists} as const)
export const addTodolist = (title: string, todolistId: string) => ({type: 'ADD_TODOLIST', title, todolistId} as const)

export const fetchTodolists = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolists(res.data))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    const newTodolistId = res.data.data.item.id
                    dispatch(addTodolist(title, newTodolistId))
                }

            })
    }
}