import { combineReducers } from 'redux';
import { userInfo } from './UserInfoReducer';
import { searchOptions } from './SearchOptionsReducer';
import { carSearch } from './CarSearchReducer';

export const rootReducer = combineReducers({
  "user": userInfo,
  "searchOptions": searchOptions,
  "cars": carSearch
})