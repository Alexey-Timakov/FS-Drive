import { MongoDataSource } from "@/data_source/mongo.data.source";
import { User as UserEntity } from "@/users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Cars as CarsEntity } from "../entities/car.entity";
import { ICarInfo } from "../interfaces/ICar";
import { ICarSearchBody } from "../interfaces/ICarSearchBody";
const _ = require('lodash/array');

// import { ObjectID } from "mongodb";

@Injectable()
export class CarsRepository {

  async addCar(newCar: ICarInfo, userId: string): Promise<CarsEntity> {
    const carRepository = MongoDataSource.getMongoRepository(CarsEntity);

    try {
      const newCarData = carRepository.create(newCar);
      // const newCarData = new NewCar(newCar);
      // newCarData._id = ObjectID();
      newCarData.user = userId;
      newCarData.avgRank = 0;
      return await carRepository.save(newCarData);
    } catch (error) {
      throw new Error;
    }
  }

  async updateUsersCars(userId: string, carId: string): Promise<UserEntity> {
    const userRepository = MongoDataSource.getMongoRepository(UserEntity);
    try {
      const queryUser = await userRepository.findOneBy(userId);
      if (queryUser) {
        const usersCars = [...queryUser.cars, carId];
        queryUser.cars = usersCars;
        return await userRepository.save(queryUser);
      }
    } catch (error) {
      throw new Error;
    }
  }

  async getAllCars(): Promise<CarsEntity[]> {
    const repository = MongoDataSource.getMongoRepository(CarsEntity);
    return await repository.find();
  }

  async getCar(carId: string): Promise<CarsEntity> {
    const repository = MongoDataSource.getMongoRepository(CarsEntity);
    try {
      return await repository.findOneBy(carId);
    } catch (error) {
      throw new Error;
    }
  }

  async searchCarsWithTown(searchOptions: ICarSearchBody): Promise<CarsEntity[]> {
    const carsRepository = MongoDataSource.getMongoRepository(CarsEntity);
    try {
      const queryCars = await carsRepository.find({
        where: {
          town: searchOptions.town,
          categoryName: searchOptions.categoryName
        }
      });

      if (queryCars) {
        const filteredCars = queryCars.filter(item => {
          const intersect = _.intersection(item.orderedDates, searchOptions.dates);
          return intersect.length === 0;
        });
        return filteredCars;
      }
    } catch (error) {
      console.log(error);
      throw new Error;
    }
  }

  async searchCarsWithoutTown(searchOptions: ICarSearchBody): Promise<CarsEntity[]> {
    const carsRepository = MongoDataSource.getMongoRepository(CarsEntity);
    try {
      const queryCars = await carsRepository.find({
        where: {
          categoryName: searchOptions.categoryName
        }
      });

      if (queryCars) {
        const filteredCars = queryCars.filter(item => {
          const intersect = _.intersection(item.orderedDates, searchOptions.dates);
          return intersect.length === 0;
        });
        return filteredCars;
      }
    } catch (error) {
      console.log(error);
      throw new Error;
    }
  }
}