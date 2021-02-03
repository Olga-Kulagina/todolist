import {authReducer, AuthStateType, setIsLoggedIn} from './auth-reducer';

let startState: AuthStateType = {
    isLoggedIn: false
};

test('if log in is true, isLoggedIn should be true', () => {
    const action = setIsLoggedIn(true)

    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true)
})
