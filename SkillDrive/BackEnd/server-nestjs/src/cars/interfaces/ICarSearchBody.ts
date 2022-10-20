import { ICarEngine } from "./ICar";
import { Cars as CarsEntity } from "../entities/car.entity";

export interface ICarSearchBody {
  town: string;
  dates: string[];
  categoryName: string;
};

export interface ICarSearchResult {
  brand: string;
  model: string;
  year: number;
  engine: ICarEngine;
  transmission: string;
  drivingWheelType: string;
  price: number;
  categoryName: string;
  primaryImageLink: string;
  carId: string;
  user: string;
  avgRank: number;
};

export class CarSearchResult {
  brand: string;
  model: string;
  year: number;
  engine: ICarEngine;
  transmission: string;
  drivingWheelType: string;
  price: number;
  categoryName: string;
  primaryImageLink: string;
  carId: string;
  user: string;
  avgRank: number;

  constructor(model: CarsEntity) {
    this.brand = model.brand;
    this.model = model.model;
    this.year = model.year;
    this.engine = model.engine;
    this.transmission = model.transmission;
    this.drivingWheelType = model.drivingWheelType;
    this.price = model.prices?.priceUsual || 9999;
    this.categoryName = model.categoryName;
    this.primaryImageLink = model.imagesLinks[0];
    this.user = model.user;
    this.carId = model._id.toString();
  }
}