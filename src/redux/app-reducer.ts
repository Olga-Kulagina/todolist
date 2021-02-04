import {Dispatch} from 'redux';
import {authAPI} from '../api/todolosts-api';
import {setIsLoggedIn} from './auth-reducer';


export type SetIsInitializedActionType = ReturnType<typeof setIsInitialized>

type ActionType = SetIsInitializedActionType

export type AppStateType = typeof initialState

const initialState = {
    isInitialized: false
}

export const appReducer = (state: AppStateType = initialState, action: ActionType): AppStateType => {
    switch (action.type) {
        case 'SET_IS_INITIALIZED': {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

export const setIsInitialized = (value: boolean) => ({type: 'SET_IS_INITIALIZED', value} as const)


export const setIsInitializedTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))
                }
                dispatch(setIsInitialized(true))
            })

    }
}


