import nodemailer from 'nodemailer';



// Send the email
const sendmail = (to, resetLink) => {
    // Create a transporter object using your email service (e.g., Gmail)
    const transporter = nodemailer.createTransport({
        host: "gmail",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.NODE_EMAIL,
            pass: process.env.NODE_EMAIL_PASS,
        },
    });

    // const resetLink = `https://your-website.com/reset-password?token=${token}`;
    // Email options
    const mailOptions = {
        from: `<${process.env.NODE_EMAIL}>`, // sender address
        to, // List of receivers
        subject: 'Password Reset Request',
        text: `To reset your password, please click the link below:\n${resetLink}`,
        html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetLink}">Reset Password</a>
           <p>If you did not request this, please ignore this email.</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error: ' + error);
        }
        console.log('Email sent: ' + info.response);
    });
}

export default sendmail;
