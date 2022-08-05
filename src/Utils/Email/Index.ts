import * as nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

export function sendEmail(code: string){
    var mailOptions = {
        from: 'ezfath71@gmail.com',
        to: 'amirhosseineskini133@gmail.com',
        subject: 'Sending Email using Node.js',
        html: `<center><h3>Code</h3><h1>${code}</h1></center>`
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}