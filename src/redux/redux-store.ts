import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {authReducer} from './auth-reducer';
import {appReducer} from './app-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer,
    app: appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;


