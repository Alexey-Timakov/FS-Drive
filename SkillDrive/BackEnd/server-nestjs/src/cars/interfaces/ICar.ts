import { Cars as CarsEntity } from "../entities/car.entity";
import { ObjectID } from "typeorm"

export interface NewCarQueryParams {
  userId: string;
}

export interface ICarMain {
  carId: ObjectID;
  brand: string;
  model: string;
  year: number;
  town: string;
  categoryName: string;
  primaryImageLink: string;
  user: string;
};

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

export interface ICarFeatures {
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
}

export interface ICarPrices {
  priceUsual: number;
  price3Days: number;
  price5Days: number;
};

export interface ICarEngine {
  size: number;
  brakePower: number;
  fuelType: string;
};

export interface ICarInfo extends ICarMain {
  numberPlate: string;
  VIN: string;
  PTSnumber: string;
  STSnumber: string;
  color: string;
  prices: ICarPrices,
  bodyType: string;
  imagesLinks: string[];
  engine: ICarEngine;
  transmission: string;
  drivingWheelType: string;
  totalMileage: number;
  features: ICarFeatures;
  orderedDates: string[];
};