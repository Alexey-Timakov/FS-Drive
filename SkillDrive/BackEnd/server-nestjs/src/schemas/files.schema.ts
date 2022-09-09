import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaTypes, Types } from "mongoose";
import { User } from "./user.schema";
import { IUserScanLink } from "../files/interfaces/IUserScanLink";


export type FileModelDocument = FileModel & Document;

@Schema()
export class FileModel {
  @Prop({ type: SchemaTypes.Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  @Prop()
  documents: IUserScanLink[]
}

export const FileSchema = SchemaFactory.createForClass(FileModel);