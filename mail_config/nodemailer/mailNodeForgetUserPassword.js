const nodemailer = require("nodemailer");

async function sendNodeForgetUserPass(email, name, token) {
  // Configurar la cuenta de correo y el de stinatario

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: true,
      auth: {
        user: process.env.MAILER_AUTH,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAILER_AUTH,
      to: email,
      subject: "Recuperación de cuenta",
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
      rel="stylesheet"
    />
    <title>Bienvenidos a Contact BPO - dashboard</title>
<!--[if mso]>
      <style>
        .button {
         border-radius: 5px;
      background-color: #175676;
      color: #ffffff;
      text-decoration: none;
      padding: 5px 10px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
        }
    
      </style>
    <![endif]-->

    <!--[if !mso]><!-->
      <style>
        .button {
           border-radius: 5px;
      background-color: #175676;
      color: #ffffff;
      text-decoration: none;
      padding: 5px 10px;
      text-align: center;
      display: inline-block;
      font-weight: bold;
      cursor: pointer;
    
        }
      </style>
    <!--<![endif]-->
  </head>
  <body style="font-family: Poppins;">
    <table>
  <tr>
    <td style="mso-margin-top-alt:10px; mso-margin-bottom-alt:10px;">
         <a href="https://www.contactbpo.pe/" target="_blank">
        <img
          width="120"
          style="border-width:0;"
          border="0"
          src="https://www.contactbpo.pe/img/logo.png"
          alt="página de contactbpo.com"
        />
      </a>
    </td>
  </tr>
    </table>
  
    <div class="name">
      <h4
        style="
          Margin: 0;
          margin-top: 1rem;
          font-family: Poppins;
          font-size: 1.2rem;
          color: #175676;
        "
      >
        Hola ${name}, acabas de solicitar un cambio de contraseña
      </h4>
      <span style="font-family: Poppins; font-size: 14px; Margin: 0 0 0 0;">
       El siguiente paso es ingresar al siguiente enlace para realizar la actualización: 
      </span>
        <table style="Margin: 10px 0px 10px 0" >
        <tr>
        <td>
          <a class="button" href="${process.env.URL_DEV}/new-password/${token}" style="color: white;">Generar nueva contraseña</a>
        </td>
      </tr>
    </table>
    <div style="Margin: 20px 0px 10px 0px;">
      <span>El equipo de Contact</span>
    </div>
    </div>
  </body>
</html>
        `,
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log("Mensaje enviado: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendNodeForgetUserPass,
};
