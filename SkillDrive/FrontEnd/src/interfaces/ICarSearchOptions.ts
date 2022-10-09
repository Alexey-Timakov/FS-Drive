export interface CarCategory {
  categoryName: string;
  categoryClass?: string;
};

export interface Town {
  townName: string;
  townState: string;
}

export interface CarSearchOptions {
  town: string;
  townVariants: Town[];
  dates: string;
  carCategory: string;
}