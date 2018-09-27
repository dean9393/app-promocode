import { createStore, applyMiddleware } from 'redux'

const initialState = {
    user: null,
}

//
// reducer...
//

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "setUser": return {...state, user: action.value}
    }
    return state;
}

//
// store...
//

const store = createStore(reducer)
export {store}

//
// action...
//

export const setUser = (user) => {
    return {
        type: "setUser",
        value: user,
    }
}