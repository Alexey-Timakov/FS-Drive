import { Types } from 'mongoose';
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { IFeedback } from '../interfaces/Ifeedback';

@Entity()
export class Feedback {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  //Id of car owner. All feedbacks are related to user, not to car.
  userId: Types.ObjectId;

  @Column()
  feedbacks: IFeedback[];

  @Column()
  avgRank: number;
}