import {combineReducers, createStore, applyMiddleware} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    todolists: todolistsReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;


