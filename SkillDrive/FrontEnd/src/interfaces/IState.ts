import { CarSearchOptions } from "./ICarSearchOptions";
import { IUserState } from "./IUserState";
export interface IState {
  user: IUserState;
  searchOptions: CarSearchOptions
}