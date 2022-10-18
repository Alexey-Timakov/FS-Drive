import { ObjectID } from "typeorm/driver/mongodb/typings";

export interface IFeedback {
  userId: string;
  rank: number;
  date: string;
  text: string;
}

export class NewCarFeedbackData {
  carId: string;
  feedbacks: IFeedback[];

  constructor(feedback: IFeedback, carId: string) {
    this.carId = carId;
    this.feedbacks = [feedback];
  }
}