export interface CarForMainPage {
  _id: string;
  brand: string;
  model: string;
  year: number;
  minimumPrice: number;
  categoryClass: string;
  primaryImageLink: string;
  imagesLinks: string[];
  user: string;
};

export interface carRank {
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

export interface CarInfo extends CarForMainPage {
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
    ranks: carRank[];
  }
};

export interface CarSearchResults {
  defaultResults: CarForMainPage[];
  fetchedResults: CarForMainPage[];
  fetchedCar: CarInfo;
}