import { User } from "@/users/entities/user.entity";
import { Cars as CarsEntity } from "../entities/car.entity";
import { ObjectID } from "typeorm"
export interface NewCarQueryParams {
  userId: string;
}

export interface Car {
  brand: string;
  model: string;
  year: number;
  minimumPrice: number;
  categoryClass: string;
  primaryImageLink: string;
  imagesLinks: string[];
  user: string;
  _id: ObjectID;
};

export class NewCar {
  brand: string;
  model: string;
  year: number;
  minimumPrice: number;
  categoryClass: string;
  primaryImageLink?: string;
  imagesLinks: string[];
  user: string;
  _id: ObjectID;

  constructor(model: CarsEntity) {
    this.brand = model.brand;
    this.model = model.model;
    this.year = model.year;
    this.minimumPrice = model.minimumPrice;
    this.categoryClass = model.categoryClass;
    this.primaryImageLink = null;
    this.imagesLinks = [];
    this.user = null;
    this._id = null;
  }
}