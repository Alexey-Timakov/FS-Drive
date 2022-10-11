import { Injectable } from '@nestjs/common';
import { Cars as CarsEntity } from './entities/car.entity';
import { Car as CarInterface } from './interfaces/ICar';
import { CarsRepository } from './repositories/cars.repository';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) { }

  async addCar(newCar: CarInterface, userId: string): Promise<CarsEntity> {
    const carResult = await this.carsRepository.addCar(newCar, userId);
    if (carResult) {
      const carId = carResult._id.toString();
      const userResult = await this.carsRepository.updateUsersCars(userId, carId);
      if (userResult) {
        return carResult;
      } else throw new Error;
    } else throw new Error;
  }

  async getAllCars(): Promise<CarsEntity[]> {
    return await this.carsRepository.getAllCars();
  }
}
