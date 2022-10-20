import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Cars as CarsEntity } from './entities/car.entity';
import { ICarInfo, ICarMain, NewCarQueryParams } from './interfaces/ICar';
import { ICarSearchBody, ICarSearchResult } from './interfaces/ICarSearchBody';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Get('get-all-cars')
  async getAllCars(): Promise<ICarMain[]> {
    return await this.carsService.getAllCars();
  }

  @Post('search-cars')
  async searchCars(@Body() searchOptions: ICarSearchBody) {
    return await this.carsService.searchCars(searchOptions);
  }

  @Get('get-car/:id')
  async getCar(@Param('id') carId: string): Promise<CarsEntity> {
    return await this.carsService.getCar(carId);
  }

  @Post('add-car')
  async addCar(@Query() query: NewCarQueryParams, @Body() newCar: ICarInfo): Promise<CarsEntity> {
    return await this.carsService.addCar(newCar, query.userId);
  }
}
