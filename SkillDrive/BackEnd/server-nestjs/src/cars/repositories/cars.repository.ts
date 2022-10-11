import { MongoDataSource } from "@/data_source/mongo.data.source";
import { User as UserEntity } from "@/users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Cars as CarsEntity } from "../entities/car.entity";
import { Car as CarInterface, NewCar } from "../interfaces/ICar";
import { ObjectID } from "mongodb";

@Injectable()
export class CarsRepository {

  async addCar(newCar: CarInterface, userId: string): Promise<CarsEntity> {
    const carRepository = MongoDataSource.getMongoRepository(CarsEntity);

    try {
      const newCarData = new NewCar(newCar);
      newCarData._id = ObjectID();
      newCarData.user = userId;
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
}