import {combineReducers, createStore, applyMiddleware} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import thunk from 'redux-thunk'
import {tasksReducer} from './tasks-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;


