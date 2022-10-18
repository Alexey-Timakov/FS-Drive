import { MongoDataSource } from "@/data_source/mongo.data.source";
import { Injectable } from "@nestjs/common";
import { Feedback as FeedbackEntity } from "../entities/feedback.entity";
import { IFeedback, NewCarFeedbackData } from "../interfaces/Ifeedback";
// import { ObjectID } from "mongodb";

@Injectable()
export class FeedbackRepository {

  async getCarFeedbacks(carId: string): Promise<FeedbackEntity> {
    const repository = MongoDataSource.getMongoRepository(FeedbackEntity);
    const queryCar = { "carId": carId };
    try {
      return await repository.findOneBy(queryCar);
    } catch (error) {
      throw new Error;
    }
  }

  async updateCarFeedbacks(carId: string, newFeedback: IFeedback): Promise<FeedbackEntity> {
    const repository = MongoDataSource.getMongoRepository(FeedbackEntity);
    const queryCar = { "carId": carId };
    try {
      const carFeedbacks = await repository.findOneBy(queryCar);
      if (carFeedbacks) {
        carFeedbacks.feedbacks.push(newFeedback);
        return await repository.save(carFeedbacks);
      }
      else {
        const newCarFeedbacks = new NewCarFeedbackData(newFeedback, carId);
        return repository.save(newCarFeedbacks);
      }
    } catch (error) {
      throw new Error;
    }
  }
}

// const queryUser = { "_id": new ObjectID(userId) };