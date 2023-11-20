import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib/db/prisma';
import { EmailTypes } from '@/constants';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    // hitting database with the token
    if (emailType === EmailTypes.VERIFY) {
      await prisma.users.update({
        where: {
          id: userId
        },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000
        }
      })
    } else if (emailType === EmailTypes.RESET) {
      await prisma.users.update({
        where: {
          id: userId
        },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000
        }
      })
    }

    // configuration of mail transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERID,
        pass: process.env.MAILTRAP_PASSWORD
      }
    });

    const mailOptions = {
      from: 'sorbopriyo@gmail.com',
      to: email,
      subject: emailType === EmailTypes.VERIFY ? 'Verify your email' : 'Reset your password',
      html: `
      <style>
        .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
              color: #333;
          }
          p {
              color: #555;
          }
          .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
          }
      </style>
      <div class="container">
        <h2>${emailType === EmailTypes.VERIFY ? 'Verify your email' : 'Reset your password'}</h2>
        <p>Hello ${email},</p>
        <p>Click the button below to ${emailType === EmailTypes.VERIFY ? 'verify your email' : 'reset your password'}:</p>
        <a class="btn" href="${process.env.DOMAIN}/${emailType === EmailTypes.VERIFY ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}">${emailType === EmailTypes.VERIFY ? 'Verify' : 'Reset password'}</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Thanks,<br>Pragnayaan Team</p>
      </div>`
    }

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
