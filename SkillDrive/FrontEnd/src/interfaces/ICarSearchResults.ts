import { IUserData } from "../Interfaces/IUserData";

export interface Car {
  brand: string;
  model: string;
  year: number;
  minimumPrice: number;
  categoryClass: string;
  primaryImageLink: string;
  owner: IUserData;
};

export interface CarSearchResults {
  defaultResults: Car[];
  fetchedResults: Car[];
}