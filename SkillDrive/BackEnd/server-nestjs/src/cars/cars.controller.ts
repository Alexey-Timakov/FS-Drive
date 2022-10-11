import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car as CarInterface, NewCarQueryParams } from './interfaces/ICar';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Get('get-all-cars')
  async getAllCars() {
    return await this.carsService.getAllCars();
  }

  @Post('add-car')
  async addCar(@Query() query: NewCarQueryParams, @Body() newCar: CarInterface) {
    return await this.carsService.addCar(newCar, query.userId);
  }
}
