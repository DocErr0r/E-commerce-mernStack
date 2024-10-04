import nodemailer from 'nodemailer';

// Create a transporter object using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "octanetjs@gmail.com",
        pass: "Nitin@123",
    },
});


// Send the email

const sendmail = (to,resetLink) => {
    // const resetLink = `https://your-website.com/reset-password?token=${token}`;
    // Email options
    const mailOptions = {
        from: '<maddison53@ethereal.email>', // sender address
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
