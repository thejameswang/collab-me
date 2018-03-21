// reducers/index.js
import {combineReducers} from 'redux';
import DocumentsReducer from './documents_reducer'
import UserReducer from './user_reducer'
import CurrentReducer from './current_reducer'

const rootReducer = combineReducers({
    documents: DocumentsReducer,
    user: UserReducer,
    current: CurrentReducer
});
export default rootReducer;
