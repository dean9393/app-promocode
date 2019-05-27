import { createStore } from 'redux'

const initialState = {
    user: null,
    category: null,
    subcategory: null,
    city_id: null,
    cityTitle: null,
    back: null,
    id: null,
    phone: null,
    title: null,
    rPromo: false,
    rHome: false,
    rReview: false,
    error: false,
    notifications: false,
}

//
// reducer...
//

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "setUser": return {...state, user: action.value}
        case "setCategory": return {...state, category: action.value}
        case "setSubcategory": return {...state, subcategory: action.value}
        case "setCityId": return {...state, city_id: action.value}
        case "setCityTitle": return {...state, cityTitle: action.value}
        case "setBack": return {...state, back: action.value}
        case "setId": return {...state, id: action.value}
        case "setPhone": return {...state, phone: action.value}
        case "setTitle": return {...state, title: action.value}
        case "setRPromo": return {...state, rPromo: action.value}
        case "setRHome": return {...state, rHome: action.value}
        case "setRReview": return {...state, rReview:action.value}
        case "setError": return {...state, error:action.value}
        case "setNotifications": return {...state, notifications:action.value}
    }
    return state;
}

//
// store...
//

const store = createStore(reducer)
export {store}