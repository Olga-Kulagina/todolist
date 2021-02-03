import {Dispatch} from 'redux';
import {authAPI, LoginParamsType} from '../api/todolosts-api';

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>

type ActionType = SetIsLoggedInActionType

export type AuthStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: ActionType): AuthStateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN': {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

export const setIsLoggedIn = (value: boolean) => ({type: 'SET_IS_LOGGED_IN', value} as const)


export const setIsLoggegInTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        authAPI.login(data)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))
                }
            })

    }
}

