import { UserDocument } from "@/schemas/user.schema";
import { IUserLoggedIn } from "./IUserLoggedIn";

export class IUserLoggedInWithRefreshToken extends IUserLoggedIn {
  refreshToken: string;
}