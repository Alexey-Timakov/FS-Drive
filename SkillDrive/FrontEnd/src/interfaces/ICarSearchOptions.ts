export interface CarCategory {
  categoryName: string;
  categoryClass?: string;
};

export interface Town {
  townName: string;
  townState: string;
}

export interface DateStartDateEnd {
  dateStart: string;
  dateEnd: string;
}

export interface CarSearchOptions {
  town: string;
  townVariants: Town[];
  dates: DateStartDateEnd;
  categoryName: string;
}

export interface ICarSearchBody {
  town: string;
  dates: string[];
  categoryName: string;
};