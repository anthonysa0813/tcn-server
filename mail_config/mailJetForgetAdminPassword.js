const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendEmailForgetPassAdmin = async (email, name, password) => {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "anthonysa0813@gmail.com",
            Name: "Contact BPO",
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: "Recuperación de cuenta",
          TextPart: `Hola ${name}, solicitud derecuperación de cuenta`,
          HTMLPart: `<!DOCTYPE html>
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
        Hola ${name}, ahora podrás ingresar con los siguientes datos:
      </h4>
      <span style="font-family: Poppins; font-size: 14px; Margin: 0 0 0 0;">
      No olvides cambiar la contraseña una vez ingresado a la plataforma: 
      </span>
        <table style="Margin: 10px 0px 10px 0" >
        <tr>
        <td>
         <span>Email: ${email}</span>
        </td>
         <tr>
          <td>
            <span>Contraseña: ${password}</span>
          </td>
         </tr>
      </tr>
    </table>
    <div style="Margin: 20px 0px 10px 0px;">
      <span>El equipo de Contact</span>
    </div>
    </div>
  </body>
</html>
        `,
        },
      ],
    });

    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmailForgetPassAdmin;
