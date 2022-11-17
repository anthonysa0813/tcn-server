const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendEmailWithjet = async (email, name, password) => {
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
          Subject: "Your email flight plan!",
          TextPart: `¡Hola ${name}, BIENVENIDO a CONTACT!`,
          HTMLPart: `<h3>Ahora eres parte de contact dashboard</h3><br />
                <div>
                  <strong>Email:</strong><span>${email}</span>
                </div>
                <div>
                  <strong>Password:</strong><span>${password}</span>
                </div>
                <div>
                  <strong>Enlace:</strong><a target="_blank">https://client-bpo.vercel.app/admin</a>
                </div>
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

module.exports = sendEmailWithjet;
