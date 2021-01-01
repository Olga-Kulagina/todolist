import {deleteTask, tasksReducer, TasksStateType} from './tasks-reducer';
import {TaskPriorities, TaskStatus} from '../Task/Task';

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        'todolistId1': [
            {title: 'bread', todoListId: 'todolistId1', status: TaskStatus.New, startDate: '', priority: TaskPriorities.Hi,
            order: -8, id: 'taskId1', description: '', deadline: '', addedDate: ''},
            {title: 'milk', todoListId: 'todolistId1', status: TaskStatus.New, startDate: '', priority: TaskPriorities.Hi,
                order: -9, id: 'taskId2', description: '', deadline: '', addedDate: ''},
            {title: 'apple', todoListId: 'todolistId1', status: TaskStatus.New, startDate: '', priority: TaskPriorities.Low,
                order: -10, id: 'taskId3', description: '', deadline: '', addedDate: ''}
            ],
        'todolistId2': [
            {title: 'January', todoListId: 'todolistId2', status: TaskStatus.New, startDate: '', priority: TaskPriorities.Hi,
                order: -18, id: 'taskId11', description: '', deadline: '', addedDate: ''},
            {title: 'May', todoListId: 'todolistId2', status: TaskStatus.New, startDate: '', priority: TaskPriorities.Low,
                order: -19, id: 'taskId21', description: '', deadline: '', addedDate: ''},
            {title: 'August', todoListId: 'todolistId2', status: TaskStatus.New, startDate: '', priority: TaskPriorities.Low,
                order: -110, id: 'taskId31', description: '', deadline: '', addedDate: ''}
        ]
    };
});


test('task should be delete correct', () => {
    const action = deleteTask('taskId21', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].every(t => t.id !== 'taskId21')).toBeTruthy()
})