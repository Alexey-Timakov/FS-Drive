import { MongoDataSource } from "@/data_source/mongo.data.source";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { Like } from "typeorm";
import { Towns } from "../entities/town.entity";

@Injectable()
export class TownRepository {

  async getTowns(townName: string): Promise<Towns[]> {
    const repository = MongoDataSource.getMongoRepository(Towns);
    try {
      // const result = await repository.findBy({
      //   city: Like(`%${townName}%`)
      // });
      // const result = await repository.find({
      //   where: {
      //     city: Like(`%${townName}%`)
      //   }
      const queryString = new RegExp(`^${townName}`, "gi");
      const result = await repository.find({
        where: {
          city: queryString
        },
        take: 5,
      })
      return result;
    } catch (error) {
      throw new Error;
    }
  }
}