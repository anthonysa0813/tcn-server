const nodemailer = require("nodemailer");

const emailNewPassword = async (data) => {
  const { email, token, name } = data;
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "99ab7c93e0bf17",
      pass: "7c27449e79783f",
    },
  });

  const info = await transport.sendMail({
    from: '"ContactBpo - Soluciones digitales" <correobpo@contactbpo.com>',
    to: email,
    subject: "ContactBpo - Nueva Contraseña",
    text: "Petición para generar una nueva Contraseña",
    html: `<p>Hola: ${name}, haz solicitado generar una nueva contraseña</p>
    <p>Sigue los pasos del siguiente enlace</p>
    <a href="${process.env.URL_DEV}/new-password/${token}">Generar nueva contraseña</a>
    `,
  });
};

module.exports = {
  emailNewPassword,
};
