import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userName: string

  @Prop()
  userBirth: string

  @Prop()
  userMail: string

  @Prop()
  userPhone: string

  @Prop()
  userPassport: string

  @Prop()
  userPassportDate: string

  @Prop()
  userPassportEmitent: string

  @Prop()
  userPassportEmitentId: string

  @Prop()
  userLicId: string

  @Prop()
  userLicIdDate: string

  @Prop()
  userPassword: string

  @Prop()
  userAvatarLink: string

  @Prop()
  accessToken: string

  @Prop()
  refreshToken: string

  @Prop()
  resetToken: string
}

export const UserSchema = SchemaFactory.createForClass(User);