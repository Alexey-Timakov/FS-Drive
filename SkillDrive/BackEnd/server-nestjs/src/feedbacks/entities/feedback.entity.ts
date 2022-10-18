import { Types } from 'mongoose';
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { IFeedback } from '../interfaces/Ifeedback';

@Entity()
export class Feedback {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  carId: Types.ObjectId;

  @Column()
  feedbacks: IFeedback[];
}