import { Types } from 'mongoose';
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { IUserScanLink } from '../interfaces/IUserScanLink';

@Entity()
export class File {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userId: Types.ObjectId

  @Column()
  documents: IUserScanLink[]
}