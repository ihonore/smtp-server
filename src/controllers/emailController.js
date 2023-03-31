import nodemailer from 'nodemailer';

export class MailController {
  async sendEmail(req, res) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use TLS
        auth: {
          user: 'bangzdoe0@gmail.com',
          pass: 'tzdzrveatudhmawe'
        }
      });

      const mailOptions = {
        from: 'bangzdoe0@gmail.com',
        to: 'ihonore03@gmail.com',
        subject: 'Test RTILA NODE SERVER Email Subject',
        text: 'Hello world!'
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ status: 500, message: "There was an error sending an email", error: error })
          console.error('There was a problem sending the email:', error);
        } else {
          res.status(200).json({ status: 200, message: "Email sent successfully", data: info })
          console.log('Email sent successfully!', info.response);
        }
      });


    } catch (error) {
      res.status(500).json({ message: "Internal server error!" })
    }
  }
}