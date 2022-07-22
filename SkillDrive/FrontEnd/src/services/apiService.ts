import { userData } from "../interfaces/userData";
import { userDataToLogin } from "../interfaces/userDataToLogin";
import { userDataToResetPass } from "../interfaces/userDataToResetPass";

const headersWithoutJWT = {
  "Origin": "http://localhost:8080",
  "Content-Type": "application/json;charset=utf-8"
};

export const ApiService = {
  async sendDataToServer(url: string, method: string,  body: userData | userDataToLogin | userDataToResetPass): Promise<any> {
    const options = {
      "method": method,
      "headers": headersWithoutJWT,
      body: JSON.stringify(body),
    };
    const responce = await fetch(url, options);

    return responce;
  }
}