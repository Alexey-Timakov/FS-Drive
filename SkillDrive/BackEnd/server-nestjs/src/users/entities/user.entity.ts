import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userName: string;

  @Column()
  userBirth: string;

  @Column({ unique: true })
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
  userAvatarLink: string

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  resetToken: string;

  @Column()
  cars: string[];
}