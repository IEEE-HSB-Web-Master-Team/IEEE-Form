import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
export async function sendEmail ({to,subject,html } )
{
    const transporter = nodemailer.createTransport( {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
            user:process.env.MAIL,
            pass:process.env.PASS,
        },
    } );
    // receiver
    const info = await transporter.sendMail( {
        from:`"IEEE Confirmation"<${process.env.MAIL}>`,
        to,
        subject,
        html
    } )
    if ( info.accepted.length > 0 ) return true 
    return false
}

