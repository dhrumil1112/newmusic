import User from '@/models/usrModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // TODO: configure mail for usage
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY'){
           const updatedUser = await User.findByIdAndUpdate
           (userId,{
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000) // 1 hour
                }
            });
            console.log('Updated User for VERIFY', updatedUser);
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    $set: { 
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: new Date(Date.now() + 3600000) // 1 hour
                    }
                }
            );
        }


        // Create a test account or replace with real credentials.
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "b3762477838c64",
                pass: "fc20a8efb0a5e7"
            }
        });
        // Wrap in an async IIFE so we can use await.
        const mailOptions = {
            from: 'dhrumil@blisswebsolutions.com', // sender address
            to: email,  // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "Verify your email" : "Reset your password"} or copy and paste the link below in your brower.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`, // HTML body
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}