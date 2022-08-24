import { IResetPassCredentials } from "./IResetPassCredentials";

export class IChangePassCredentials extends IResetPassCredentials {
  userPassword: string;
}