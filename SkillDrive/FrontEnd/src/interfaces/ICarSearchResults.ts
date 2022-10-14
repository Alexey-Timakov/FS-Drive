export interface CarForMainPage {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  categoryClass: string;
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

export interface CarInfo extends CarForMainPage {
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

  orderedDates: [];

  ranks: ICarRank[];
};

export interface CarSearchResults {
  defaultResults: CarForMainPage[];
  fetchedResults: CarForMainPage[];
  fetchedCar: CarInfo;
}