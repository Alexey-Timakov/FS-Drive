import { Types } from 'mongoose';
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { IFeedback } from '../interfaces/Ifeedback';

@Entity()
export class Feedback {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  //Id of car. All feedbacks are related to a car, not to a user.
  carId: Types.ObjectId;

  @Column()
  feedbacks: IFeedback[];

  @Column()
  avgRank: number;
}