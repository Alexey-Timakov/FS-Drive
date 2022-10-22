import { MongoDataSource } from "@/data_source/mongo.data.source";
import { Injectable } from "@nestjs/common";
import { Feedback as FeedbackEntity } from "../entities/feedback.entity";
import { IFeedback, NewCarFeedbackData } from "../interfaces/Ifeedback";
import { ObjectID } from "mongodb";
import { Cars as CarsEntity } from "@/cars/entities/car.entity";

@Injectable()
export class FeedbackRepository {

  async getCarFeedbacks(carId: string): Promise<FeedbackEntity | null> {
    const repository = MongoDataSource.getMongoRepository(FeedbackEntity);
    const queryCar = { "carId": carId };
    try {
      const result = await repository.findOneBy(queryCar);
      if (result) return result;
      else return null;
    } catch (error) {
      throw new Error;
    }
  }

  async updateCarFeedbacks(carId: string, newFeedback: IFeedback): Promise<FeedbackEntity> {
    const feedbackRepository = MongoDataSource.getMongoRepository(FeedbackEntity);
    const carRepository = MongoDataSource.getMongoRepository(CarsEntity);

    const queryFeedbacks = { "carId": carId };
    const queryCarToUpdate = { "_id": new ObjectID(carId) };

    try {
      const carFeedbacks = await feedbackRepository.findOneBy(queryFeedbacks);
      if (carFeedbacks) {
        carFeedbacks.feedbacks.push(newFeedback);
        const updatedAvgRank = carFeedbacks.feedbacks.reduce((acc, item) => acc + item.rank, 0) / carFeedbacks.feedbacks.length;
        const roundedUpdatedAvgRank = Math.round(updatedAvgRank * 10) / 10;
        carFeedbacks.avgRank = roundedUpdatedAvgRank;
        carRepository.findOneAndUpdate(queryCarToUpdate, { $set: { "avgRank": roundedUpdatedAvgRank, "totalRanks": carFeedbacks.feedbacks.length } });
        return await feedbackRepository.save(carFeedbacks);
      }
      else {
        const newCarFeedback = new NewCarFeedbackData(carId, newFeedback);
        carRepository.findOneAndUpdate(queryCarToUpdate, { $set: { "avgRank": Math.round(newFeedback.rank * 10) / 10, "totalRanks": 1 } });
        return feedbackRepository.save(newCarFeedback);
      }
    } catch (error) {
      throw new Error;
    }
  }
}