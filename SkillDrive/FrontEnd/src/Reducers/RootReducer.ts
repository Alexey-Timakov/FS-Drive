import { combineReducers } from 'redux';
import { userInfo } from './UserInfoReducer';
import { searchOptions } from './SearchOptionsReducer';

export const rootReducer = combineReducers({
  "user": userInfo,
  "searchOptions": searchOptions,
})