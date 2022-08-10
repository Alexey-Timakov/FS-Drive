import { UserData } from "../interfaces/UserData";
import { UserDataToLogin } from "../interfaces/UserDataToLogin";
import { UserDataToResetPass } from "../interfaces/UserDataToResetPass";

const headersWithoutJWT = {
  "Origin": "http://localhost:8080",
  "Content-Type": "application/json;charset=utf-8"
};

export const ApiService = {
  async sendDataToServer(url: string, method: string,  body: UserData | UserDataToLogin | UserDataToResetPass): Promise<any> {
    const options = {
      "method": method,
      "headers": headersWithoutJWT,
      body: JSON.stringify(body),
    };
    const responce = await fetch(url, options);

    return responce;
  }
}