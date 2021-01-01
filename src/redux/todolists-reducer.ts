import {TodolistType} from '../Todolist/Todolist';
import {Dispatch} from 'redux';
import {todolistsAPI} from '../api/todolosts-api';

export type SetTodolistsActionType = ReturnType<typeof setTodolists>

type ActionType = SetTodolistsActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType>  => {
    switch (action.type) {
        case 'SET_TODOLISTS': {
            return action.todolists
        }
        default:
            return state
    }
}

export const setTodolists = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLISTS', todolists} as const)

export const fetchTodolists = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolists(res.data))
            })
    }
}