import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaTypes } from "mongoose";
import { User } from "./user.schema";

export type FileModelDocument = FileModel & Document;

type UserDocument = {
  userDocumentLink: string
};

@Schema()
export class FileModel {
  @Prop({ type: SchemaTypes.Types.ObjectId, ref: "User" })
  user: User

  @Prop()
  documents: UserDocument[]
}

export const FileSchema = SchemaFactory.createForClass(FileModel);