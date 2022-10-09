import { AuthGuard } from '@/guards/auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import ITownResponce from './interfaces/ITownResponce';
import { TownService } from './towns.service';

@UseGuards(AuthGuard)
@Controller('towns')
export class TownsController {
  constructor(private readonly townService: TownService) { };

  @Get("get-towns/:id")
  async getTowns(@Param('id') tonwName: string): Promise<ITownResponce[]> {
    return await this.townService.getTowns(tonwName);
  }
}
