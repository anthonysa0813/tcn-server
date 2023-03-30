const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendCredentialsToNewPassword = async (email, name = "", token = "") => {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "anthonysa0813@gmail.com",
            Name: "anthony sanchez",
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: "Recuperar clave",
          TextPart: `¡Hola ${name}, BIENVENIDO a CONTACT!`,
          //       HTMLPart: `<p>Hola: ${name}, haz solicitado generar una nueva contraseña</p>
          // <p>Sigue los pasos del siguiente enlace</p>
          // <a href="${process.env.URL_DEV}/new-password/${token}">Generar nueva contraseña</a>
          //     `,
          HTMLPart: `
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
  </head>
   <style>
    body {
      font-family: Poppins; 
    }
  </style>
  <body>
    <main>
      <p><p>Hola: ${name}, haz solicitado generar una nueva contraseña</p>
      <p>Sigue los pasos del siguiente enlace</p>
      <a href="${process.env.URL_DEV}/new-password/${token}" target="_blank">Generar nueva contraseña</a></p>
    </main>
    <div style="display: flex; column-gap: 0.05rem">
      <span
        style="
          height: 1px;
          width: 10px;
          background-color: black;
          display: block;
        "
      ></span>
      <span
        style="
          height: 1px;
          width: 10px;
          background-color: black;
          display: block;
        "
      ></span>
    </div>
    <div class="name">
      <h1
        style="
          margin: 0;
          margin-block: 0.25rem;
          font-family: Poppins;
          font-size: 1.5rem;
          color: #175676;
        "
      >
        Franco Rossi ferreyros
      </h1>
      <span style="font-family: Poppins; font-size: 1rem">Director</span>
      <div class="contact" style="margin-block: 1rem">
        <p style="font-family: Poppins; color: #175676; margin-block: 0">
          M: <span style="color: #0072f5">+51 987565318</span>
        </p>
        <p style="font-family: Poppins; color: #175676; margin-block: 0">
          O: <span style="color: #0072f5">+01 987565318</span>
        </p>
        <p style="font-family: Poppins; color: #175676; margin-block: 0">
          E: <span style="color: #0072f5">frossi@contact.com.pe</span>
        </p>
      </div>
      <div class="dir">
        <p style="margin: 0; font-family: Poppins; font-size: 0.8rem">
          435 Ionia Ave SW
        </p>
        <p style="margin: 0; font-family: Poppins; font-size: 0.8rem">
          Grand Rapids, MI 4763
        </p>
      </div>
      <div class="links">
        <a href="https://www.contactbpo.pe/" target="_blank"
          >https://www.contactbpo.pe</a
        >
      </div>
      <div
        style="
          width: 100px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        "
      >
        <img
          style="width: 100%; height: 100px; object-fit: contain"
          src="https://www.contactbpo.pe/img/logo.png"
        />
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

const sendEmailToActivateAccount = async (
  email,
  name = "",
  id = "",
  token = ""
) => {
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
          Subject: "Activa tu cuenta",
          TextPart: `¡Hola ${name}, BIENVENIDO a CONTACT!`,
          HTMLPart: `
          <!DOCTYPE html>
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
    <title>Bienvenidos a Contact BPO</title>
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
        Hola ${name}
      </h4>
      <span style="font-family: Poppins; font-size: 14px; Margin: 0 0 0 0;">
        ¡Gracias por registrarte en Contact! Para iniciar, por favor haz click en el botón de verificación de tu correo electrónico.
      </span>
        <table style="Margin: 10px 0px 10px 0" >
      <tr>
        <td class="button" width="150">
          <a href="${process.env.URL_DEV}/activate/${id}/${token}" target="_blank" style="text-decoration: none; color: #ffffff;">Veríficar ahora</a>
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

module.exports = { sendCredentialsToNewPassword, sendEmailToActivateAccount };
