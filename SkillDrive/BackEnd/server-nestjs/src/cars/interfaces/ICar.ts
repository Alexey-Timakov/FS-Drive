import { Cars as CarsEntity } from "../entities/car.entity";
import { ObjectID } from "typeorm"

export interface NewCarQueryParams {
  userId: string;
}

export interface ICarMain {
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

export interface ICarRank {
  userId: string;
  userName: string;
  userSurname: string;
  rank: number;
  rankInfo: {
    author: string;
    year: number;
    month: number;
    text: string;
  }
}

export interface ICarInfo extends ICarMain {
  prices: {
    priceUsual: number;
    price3Days: number;
    price5Days: number;
  },
  bodyType: string;
  endgine: {
    size: number;
    brakePower: number;
    fuelType: string;
  };
  transmission: string;
  drivingWheelType: string;
  totalMileage: number;
  features: {
    isofix?: boolean;
    airbags?: boolean;
    authonomyHeater?: boolean;
    aux?: boolean;
    bluetooth?: boolean;
    cruiseControl?: boolean;
    airConditioner?: boolean;
    multimedia?: boolean;
    navigation?: boolean;
    seatVentilation?: boolean;
    seatHeat?: boolean;
    roofTrunk?: boolean;
    parktronic?: boolean;
    rearViewCamera?: boolean;
  };
  orderedDates: [];
  rating: {
    averageRank: number;
    ranks: ICarRank[];
  }
};