import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { ICarEngine, ICarFeatures, ICarPrices, ICarRank } from '../interfaces/ICar';

@Entity()
export class Cars {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  prices: ICarPrices;

  @Column()
  categoryClass: string;

  @Column()
  primaryImageLink?: string;

  @Column()
  imagesLinks: string[];

  @Column()
  user: string;

  @Column()
  numberPlate: string;

  @Column()
  VIN: string;

  @Column()
  PTSnumber: string;

  @Column()
  STSnumber: string;

  @Column()
  color: string;

  @Column()
  bodyType: string;

  @Column()
  engine: ICarEngine;

  @Column()
  transmission: string;

  @Column()
  drivingWheelType: string;

  @Column()
  totalMileage: number;

  @Column()
  features: ICarFeatures;

  @Column()
  orderedDates: string[];

  @Column()
  ranks: ICarRank[];
}