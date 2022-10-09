import { Module } from '@nestjs/common';
import { TownRepository } from './repositories/towns.repository';
import { TownsController } from './towns.controller';
import { TownService } from './towns.service';

@Module({
  controllers: [TownsController],
  providers: [TownService, TownRepository]
})
export class TownsModule { }
