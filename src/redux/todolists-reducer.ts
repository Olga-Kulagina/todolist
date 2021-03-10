import {TodolistType} from '../Todolist/Todolist';
import {Dispatch} from 'redux';
import {todolistsAPI} from '../api/todolosts-api';

export type SetTodolistsActionType = ReturnType<typeof setTodolists>
export type AddTodolistActionType = ReturnType<typeof addTodolist>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolist>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

type ActionType = SetTodolistsActionType | AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistTitleActionType

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
        case 'REMOVE_TODOLIST': {
            return state.filter(t => t.id !== action.todolistId)
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        default:
            return state
    }
}

export const setTodolists = (todolists: Array<TodolistType>) => ({type: 'SET_TODOLISTS', todolists} as const)
export const addTodolist = (title: string, todolistId: string) => ({type: 'ADD_TODOLIST', title, todolistId} as const)
export const removeTodolist = (todolistId: string) => ({type: 'REMOVE_TODOLIST', todolistId} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolists(res.data))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.addTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const newTodolistId = res.data.data.item.id
                    dispatch(addTodolist(title, newTodolistId))
                }

            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.removeTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolist(todolistId))
                }
        })

    }
}

export const updateTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}