const nodemailer = require("nodemailer");
import { EMAIL, EMAIL_PASS } from "src/common/pass";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS
  }
});

export const sendEmail = async (emailToReset: string, resetToken: string): Promise<any> => {
  const mailOptions = {
    from: EMAIL,
    to: emailToReset,
    subject: "Email to reset password in SFDrive",
    html: `<h1>Сброс пароля на сайте SFDrive</h1><p>Чтобы изменить пароль пройдите по следующей: <a href='http://localhost:3000/users/resetpass/${resetToken}'>ссылке</a></p>`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", result);
    return result.response
  } catch (error) {
    console.log(error);
    throw new Error(`Error during sending email to ${emailToReset}`);
  }
};