import { Column, Entity, ObjectIdColumn, ObjectID, Index } from 'typeorm';

@Entity()
export class Towns {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  region: string;

  @Index({ fulltext: true })
  @Column()
  city: string | any;
}