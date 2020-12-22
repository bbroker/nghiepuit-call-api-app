import {combineReducers} from 'redux';
import products from './products';
import itemEditing from './itemEditing';

const appReducer = combineReducers({
    products,
    itemEditing
});

export default appReducer;