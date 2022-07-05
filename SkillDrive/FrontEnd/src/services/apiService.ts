import { userData } from "../interfaces/userData";

const headersWithoutJWT = {
  "Origin": "http://localhost:8080",
  "Content-Type": "application/json;charset=utf-8"
};

export const ApiService = {
  async sendDataToServer(url: string, method: string,  body: userData): Promise<any> {
    const options = {
      "method": method,
      "headers": headersWithoutJWT,
      body: JSON.stringify(body),
    };
    const responce = await fetch(url, options);

    return responce;
  }
}