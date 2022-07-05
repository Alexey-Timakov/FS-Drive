import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userName: String

  @Prop()
  userBirth: String

  @Prop()
  userMail: String

  @Prop()
  userPhone: String

  @Prop()
  userPassport: String

  @Prop()
  userPassportDate: String

  @Prop()
  userPassportEmitent: String

  @Prop()
  userPassportEmitentId: String

  @Prop()
  userLicId: String

  @Prop()
  userLicIdDate: String

  @Prop()
  userPassword: String

  @Prop()
  accessToken: String

  @Prop()
  refreshToken: String

  @Prop()
  resetToken: String
}

export const UserSchema = SchemaFactory.createForClass(User);