import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport

const sendEmail = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text,
        })

        console.log('Email sent successfully');
    } catch (error) {
        console.log('Email not send');
        console.log(error);
        console.log(error.message);
    }
};

export default sendEmail;