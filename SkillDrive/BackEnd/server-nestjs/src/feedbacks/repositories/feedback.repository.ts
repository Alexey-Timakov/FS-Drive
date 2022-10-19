import { MongoDataSource } from "@/data_source/mongo.data.source";
import { User as UserEntity } from "@/users/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Feedback as FeedbackEntity } from "../entities/feedback.entity";
import { IFeedback, NewUserFeedbackData } from "../interfaces/Ifeedback";
import { ObjectID } from "mongodb";

@Injectable()
export class FeedbackRepository {

  async getUserFeedbacks(userId: string): Promise<FeedbackEntity> {
    const repository = MongoDataSource.getMongoRepository(FeedbackEntity);
    const queryUser = { "userId": userId };
    try {
      return await repository.findOneBy(queryUser);
    } catch (error) {
      throw new Error;
    }
  }

  async updateUserFeedbacks(userId: string, newFeedback: IFeedback): Promise<FeedbackEntity> {
    const feedbackRepository = MongoDataSource.getMongoRepository(FeedbackEntity);
    const UserRepository = MongoDataSource.getMongoRepository(UserEntity);

    const queryFeedbacks = { "userId": userId };
    const queryUserToUpdate = { "_id": new ObjectID(userId) };

    try {
      const userFeedbacks = await feedbackRepository.findOneBy(queryFeedbacks);
      if (userFeedbacks) {
        userFeedbacks.feedbacks.push(newFeedback);
        const updatedAvgRank = userFeedbacks.feedbacks.reduce((acc, item) => acc + item.rank, 0) / userFeedbacks.feedbacks.length;
        userFeedbacks.avgRank = Math.round(updatedAvgRank * 10) / 10;
        UserRepository.findOneAndUpdate(queryUserToUpdate, { $set: { "avgRank": updatedAvgRank } });
        return await feedbackRepository.save(userFeedbacks);
      }
      else {
        const newUserFeedbacks = new NewUserFeedbackData(userId, newFeedback);
        UserRepository.findOneAndUpdate(queryUserToUpdate, { $set: { "avgRank": Math.round(newFeedback.rank * 10) / 10 } });
        return feedbackRepository.save(newUserFeedbacks);
      }
    } catch (error) {
      throw new Error;
    }
  }
}