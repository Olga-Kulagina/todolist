import {TodolistType} from '../Todolist/Todolist';
import {addTodolist, todolistsReducer} from './todolists-reducer';


let startState: Array<TodolistType> = [];
beforeEach(() => {
    startState = [
        {id: 'todolistId1', order: 1, addedDate: '', title: 'First ToDO'},
        {id: 'todolistId2', order: 2, addedDate: '', title: 'Second ToDO'},
    ];
});

test('add new todolist should be correct', () => {
    const action = addTodolist('Third ToDO')

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Third ToDO')
})