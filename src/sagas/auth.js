import * as types from '../types/auth'


export function loginWatcher(authParams) {
    return { 
        type: types.LOGIN, 
        payload: authParams 
    };
}

export function registerWatcher(authParams) {
    return { 
        type: types.REGISTER, 
        payload: authParams 
    };
}