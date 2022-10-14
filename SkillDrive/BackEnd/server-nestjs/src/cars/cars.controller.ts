import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { ICarInfo, ICarMain, NewCarQueryParams } from './interfaces/ICar';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Get('get-all-cars')
  async getAllCars() {
    return await this.carsService.getAllCars();
  }

  @Get('get-car/:id')
  async getCar(@Param('id') carId: string) {
    return await this.carsService.getCar(carId);
  }

  @Post('add-car')
  async addCar(@Query() query: NewCarQueryParams, @Body() newCar: ICarInfo) {
    return await this.carsService.addCar(newCar, query.userId);
  }
}
