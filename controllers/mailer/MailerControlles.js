// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');

module.exports = {
   async sendEmail(userData) {

      nodemailer.createTestAccount(async (err, data) => {
         if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
         }

         let testAccount = await nodemailer.createTestAccount();

         // Create a SMTP transporter object
         let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
               user: 'noreplytratalo@gmail.com',
               pass: 'tratalo123',
            }
         });

         // Message object
         let message = {
            from: 'Tratalo app',
            to: userData.email,
            subject: 'Estas son tus credenciales',
            html: `
         <p>Hola <b>${userData.username},</b> aquí estan tus credenciales!</p>
         <p>Puede ingresar con ellas a la plataforma <b>Tratalo</b><p/>
         <ul>
            <li>
               Usuario: ${userData.username}
            </li>
            <li>
               Contraseña: ${userData.password}
            </li>
         </ul>
      `
         };

         transporter.sendMail(message, (err, info) => {
            if (err) {
               console.log('Error occurred. ' + err.message);
               return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);

            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
         });
      });

   }

}
