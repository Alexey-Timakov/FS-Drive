import { CarSearchOptions } from "./ICarSearchOptions";
import { CarSearchResults } from "./ICarSearchResults";
import { IUserState } from "./IUserState";
export interface IState {
  user: IUserState;
  searchOptions: CarSearchOptions;
  cars: CarSearchResults
}