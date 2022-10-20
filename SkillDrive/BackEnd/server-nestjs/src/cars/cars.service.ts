import { Injectable } from '@nestjs/common';
import { Cars as CarsEntity } from './entities/car.entity';
import { ICarInfo, ICarMain, MainCarInfo } from './interfaces/ICar';
import { CarSearchResult, ICarSearchBody, ICarSearchResult } from './interfaces/ICarSearchBody';
import { CarsRepository } from './repositories/cars.repository';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) { }

  async addCar(newCar: ICarInfo, userId: string): Promise<CarsEntity> {
    const carResult = await this.carsRepository.addCar(newCar, userId);
    if (carResult) {
      const carId = carResult._id.toString();
      const userResult = await this.carsRepository.updateUsersCars(userId, carId);
      if (userResult) {
        return carResult;
      } else throw new Error;
    } else throw new Error;
  }

  async getAllCars(): Promise<ICarMain[]> {
    const queryCars = await this.carsRepository.getAllCars();
    const result = queryCars.map(item => {
      return new MainCarInfo(item);
    });
    return result;
  }

  async getCar(carId: string): Promise<CarsEntity> {
    return await this.carsRepository.getCar(carId);
  }

  async searchCars(searchOptions: ICarSearchBody): Promise<CarSearchResult[]> {
    let queryCars = [] as CarsEntity[];

    if (searchOptions.town !== "") {
      queryCars = await this.carsRepository.searchCarsWithTown(searchOptions);
    }
    else {
      queryCars = await this.carsRepository.searchCarsWithoutTown(searchOptions);
    }
    const result = queryCars.map(item => {
      return new CarSearchResult(item);
    })
    return result
  }
}
