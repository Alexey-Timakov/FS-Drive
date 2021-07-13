const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sfdriveeducation@gmail.com",
    pass: "GtBnU8Az3VbM0Uk"
  }
});

function sendEmail(emailToReset, resetToken) {
    const mailOptions = {
        from: "sfdriveeducation@gmail.com",
        to: emailToReset,
        subject: "Email to reset password in SFDrive",
        html: `<h1>Сброс пароля на сайте SFDrive</h1><p>Чтобы изменить пароль пройдите по следующей ссылке: <a href='http://localhost:8000/resetpass/${resetToken}'></a></p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log("Email sent: " + info.response);
        }
    });

}

module.exports = sendEmail;