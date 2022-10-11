import { IUserScanLink } from "./IUserScanLink";

export class IUserDocumentsInfo {
  "userId": string;
  "documents": IUserScanLink[];

  constructor(userId: string, document: string) {
    this.userId = userId;
    this.documents = [{ "userDocumentLink": document }]
  }
}