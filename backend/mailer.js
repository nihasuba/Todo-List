const nodemailer = require("nodemailer");

const sendOtpEmail = async(email,otp) => {
    const transporter = nodemailer.createTransport({
        service : "Gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
    });

    const mailoptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject :"Your OTP Code",
        text:`Your OTP code is : ${otp}`,
    };

    await transporter.sendMail(mailoptions);
}

module.exports = sendOtpEmail;