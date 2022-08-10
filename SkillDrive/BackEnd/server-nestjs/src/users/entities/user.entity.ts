import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userName: string;

  @Column()
  userBirth: string;
  
  @Column()
  userMail: string;

  @Column()
  userPhone: string;

  @Column()
  userPassport: string;

  @Column()
  userPassportDate: string;

  @Column()
  userPassportEmitent: string;

  @Column()
  userPassportEmitentId: string;

  @Column()
  userLicId: string;

  @Column()
  userLicIdDate: string;

  @Column()
  userPassword: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  resetToken: string;
}
