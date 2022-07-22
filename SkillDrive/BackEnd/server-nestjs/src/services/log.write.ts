import * as fs from "fs";
import { join } from "path";

const EVENT = [
  "Reset password request from user",
  "Change password request from user",
  "Password has been changed",
  "Error",
  "Smth else..."
];

export const resetLogFilePath = join(__dirname, '../..', "log/reset.pass.log");

export function logWrite (description: number, name: string, resetToken: string): void {
    const resetData = {
        "description": "",
        "userName": "",
        "resetToken": "",
        "dateAndTime": "",
    };

    resetData.description = EVENT[description];
    resetData.userName = name;
    resetData.resetToken = resetToken;
    resetData.dateAndTime = Date.now().toString();

    fs.appendFileSync(resetLogFilePath, JSON.stringify(resetData) + "\r\n");
}