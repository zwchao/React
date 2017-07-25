import {createStore,combineReducers} from 'redux';
import {reducer as inputReducer} from './commentInput';
import {reducer as listReducer} from './commentList';

const reducer = combineReducers({
    input: inputReducer,
    list: listReducer
});

export default createStore(reducer);