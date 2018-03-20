// reducers/index.js
import {combineReducers} from 'redux';
import DocumentsReducer from './documents_reducer'
import UserReducer from './user_reducer'

const rootReducer = combineReducers({
    documents: DocumentsReducer,
    user: UserReducer,
current: DocumentsReducer
});
export default rootReducer;
