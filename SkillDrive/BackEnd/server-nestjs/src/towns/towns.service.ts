import { Injectable } from '@nestjs/common';
import ITownResponce from './interfaces/ITownResponce';
import { TownRepository } from './repositories/towns.repository';

@Injectable()
export class TownService {
  constructor(private townRepository: TownRepository) { }

  async getTowns(townName: string): Promise<ITownResponce[]> {
    const result = await this.townRepository.getTowns(townName);
    return result.map(item => new ITownResponce(item));
  }
}
