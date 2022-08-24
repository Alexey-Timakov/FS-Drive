import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaTypes } from "mongoose";
import { User } from "./user.schema";

export type FileModelDocument = FileModel & Document;

type UserDocument = {
  userDocuumentLink: string
};

@Schema()
export class FileModel {
  @Prop({ type: SchemaTypes.Types.ObjectId, ref: "User" })
  user: User

  @Prop()
  avatar: string

  @Prop()
  documents: UserDocument[]
}

export const UserSchema = SchemaFactory.createForClass(User);