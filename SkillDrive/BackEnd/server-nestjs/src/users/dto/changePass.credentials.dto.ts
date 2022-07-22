import { resetPassCredentialsDTO } from "./resetPass.credentials.dto";

export class changePassCredentialsDTO extends resetPassCredentialsDTO {
  readonly userPassword: string;
}