const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


const { 
BREVO_EMAIL_HOST,
BREVO_EMAIL_PORT,
BREVO_EMAIL_USER,
BREVO_EMAIL_PASS,
STEMLINK_EMAIL
} = process.env;


class EmailService {
  static async createTransport() {
    return nodemailer.createTransport({
      host: BREVO_EMAIL_HOST,
      port: BREVO_EMAIL_PORT,
      auth: {
        user: BREVO_EMAIL_USER,
        pass: BREVO_EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
  }

  static async sendEmail(to, subject, html) {
    try {
    const transport = await EmailService.createTransport();
    return transport.sendMail({
      from: `StemLink <${STEMLINK_EMAIL}>`,
      to,
      subject,
      html,
    });
    } catch (error) {
      console.error('Error sending email:', error);
      return null;
    }
  }

  /* TODO
      Generate HTML for welcome page to be shown to registered users in order to verify their emails 
    */
  static generateWelcomeEmailHtml(data) {
    const { CLIENT_URL } = process.env;
    return `
    
    <div width="100%" style="margin: 0; padding: 0 !important; background-color: #f5f6fa; height: 100vh;">
    <div style="width:100%;padding: 0;margin:10 auto;background-color:#f5f6fa;">
    <div>
      <div style="padding: 40px 0;">
           <div style="width:100%;max-width:620px;margin:0 auto;">
               <div>
                   <div>
                       <div style="text-align: center; padding-bottom:25px">
                           <p style="font-size: 24px; color: #6576ff; padding-top: 12px;">StemLink</p>
                       </div>
                   </div>
               </div>
           </div>
                   
<div style="width:100%;max-width:620px;margin:0 auto;background-color:#ffffff;">
   <div>
       <div>
           <div style="padding: 30px 30px 15px 30px;">
               <h2 style="font-size: 18px; color: #6576ff; font-weight: 600; margin: 0;">Confirm Your E-Mail Address</h2>
           </div>
       </div>
       <div>
           <div style="padding: 0 30px 20px">
               <p style="margin-bottom: 10px;">Hi ${data.name},</p>
               <p style="margin-bottom: 10px;">Welcome! <br> You are receiving this email because you have registered on StemLink.</p>
               <p style="margin-bottom: 10px;">Click the link below to activate your StemLink account.</p>
               <p style="margin-bottom: 25px;">This link will expire in 15 minutes and can only be used once.</p>
               <a href="${CLIENT_URL}/email/verify/${data.verificationCode}" style="background-color:#6576ff;border-radius:4px;color:#ffffff;display:inline-block;font-size:13px;font-weight:600;line-height:44px;text-align:center;text-decoration:none; padding: 0 30px">Verify Email</a>
           </div>
       </div> 
    </div>
      
        `;
  }
}

module.exports = EmailService;
