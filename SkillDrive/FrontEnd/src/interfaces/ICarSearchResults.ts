import { IUserFeedback } from "./IUserFeedback";

//Type for search page: 
export interface ICarSearchResult {
  carId: string;
  brand: string;
  model: string;
  year: number;
  engine: ICarEngine;
  transmission: string;
  drivingWheelType: string;
  price: number;
  categoryName: string;
  primaryImageLink: string;
  avgRank: number;
  user: string;
};

export interface ICarEngine {
  size: number;
  brakePower: number;
  fuelType: string;
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

// Type on add-new-car and get-car
export interface CarInfo extends ICarSearchResult {
  numberPlate: string;
  VIN: string;
  PTSnumber: string;
  STSnumber: string;
  color: string;

  prices: {
    priceUsual: number;
    price3Days: number;
    price5Days: number;
  },

  imagesLinks: string[];

  bodyType: string;

  engine: {
    size: number;
    brakePower: number;
    fuelType: string;
  };

  transmission: string;
  drivingWheelType: string;
  totalMileage: number;

  features: ICarFeatures;

  orderedDates: string[];

  ranks: ICarRank[];
};

export interface ICarOwnerData {
  id: string;
  userAvatarLink: string;
  userName: string;
  avgRank: number;
  userBirth: string;
  userPhone: string;
  userMail: string;
  cars: string[];
  feedbacks?: IUserFeedback[];
};

// State type:
export interface CarSearchResults {
  fetchedResults: ICarSearchResult[];
  fetchedCar: CarInfo;
  carOwnerData: ICarOwnerData;
  isSearchExecuted: boolean;
}