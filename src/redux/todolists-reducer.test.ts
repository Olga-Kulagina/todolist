import {TodolistType} from '../Todolist/Todolist';
import {addTodolist, removeTodolist, todolistsReducer} from './todolists-reducer';


let startState: Array<TodolistType> = [];
beforeEach(() => {
    startState = [
        {id: 'todolistId1', order: 1, addedDate: '', title: 'First ToDO'},
        {id: 'todolistId2', order: 2, addedDate: '', title: 'Second ToDO'},
    ];
});

test('add new todolist should be correct', () => {
    const action = addTodolist('Third ToDO', 'todolistId3')

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Third ToDO')
    expect(endState[0].id).toBe('todolistId3')
})

test('delete correct todolist', () => {
    const action = removeTodolist('todolistId2')

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState.every(t => t.id !== 'todolistId2')).toBeTruthy()
})