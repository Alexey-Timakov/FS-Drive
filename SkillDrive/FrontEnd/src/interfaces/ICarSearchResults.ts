export interface Car {
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

export interface CarSearchResults {
  defaultResults: Car[];
  fetchedResults: Car[];
}