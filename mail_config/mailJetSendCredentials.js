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
          HTMLPart: `<p>Hola: ${name}, haz solicitado generar una nueva contraseña</p>
    <p>Sigue los pasos del siguiente enlace</p>
    <a href="${process.env.URL_DEV}/new-password/${token}">Generar nueva contraseña</a>
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
            Name: "anthony sanchez",
          },
          To: [
            {
              Email: "anthonysa0813@gmail.com",
              Name: name,
            },
          ],
          Subject: "Activa tu cuenta",
          TextPart: `¡Hola ${name}, BIENVENIDO a CONTACT!`,
          HTMLPart: `
    <p>Para activar tu cuenta debes de abrir el siguiente enlace: </p>
    <a href="${process.env.URL_DEV}/activate/${id}/${token}">Activar mi cuenta</a>
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
