import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class TestUserEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userMail: string;

  @Column()
  userPassword: string;

  @Column()
  userLicId: string;
}
