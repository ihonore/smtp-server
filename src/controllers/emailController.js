import nodemailer from 'nodemailer';

export class MailController {
  async sendEmail(req, res) {
    try {
      const params = {
        host: req.body.host || 'smtp.gmail.com',
        port: req.body.port || 587,
        user: req.body.username,
        pass: req.body.password,
        to: req.body.receiver,
        subject: req.body.subject || 'Email from RTILA',
        content: req.body.content
      }
      // console.log(params);

      function isHtml(str) {
        return /<[a-z][\s\S]*>/i.test(str);
      }
      
      const transporter = nodemailer.createTransport({
        host: params.host,
        port: params.port,
        secure: false, // use TLS
        auth: {
          user: params.user,
          pass: params.pass
        }
      });

      const mailOptions = {
        from: params.user,
        to: params.to,
        subject: params.subject,
      };

      if (isHtml(params.content)) {
        mailOptions.html = params.content
      } else {
        mailOptions.text = params.content
      }
      console.log(mailOptions);

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