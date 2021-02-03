import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {authReducer} from './auth-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;


