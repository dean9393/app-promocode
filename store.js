import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user';

const rootReducer = combineReducers({
    user: userReducer
})

const configure = () => {
    return createStore(rootReducer)
}

export default configure;