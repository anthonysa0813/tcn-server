const express = require("express");
const connectDB = require("../db/connectDB");
const fileUpload = require("express-fileupload");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.paths = {
      auth: "/api/auth",
      authEmployee: "/api/auth/employee",
      client: "/api/clients",
      employee: "/api/employees",
      jobs: "/api/jobs",
      services: "/api/services",
      language: "/api/language",
      profesional: "/api/profesional",
      experience: "/api/experiences",
      knoledge: "/api/knoledge",
      contracts: "/api/contracts",
    };
    this.middleware();
    this.router();
    this.connectMondoDB();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  connectMondoDB() {
    connectDB();
  }

  router() {
    this.app.use(this.paths.auth, require("../routes/auth/auth"));
    this.app.use(this.paths.client, require("../routes/clients"));
    this.app.use(this.paths.employee, require("../routes/employee"));
    this.app.use(this.paths.services, require("../routes/services"));
    this.app.use(this.paths.authEmployee, require("../routes/auth/employee"));
    this.app.use(this.paths.language, require("../routes/languages"));
    this.app.use(this.paths.profesional, require("../routes/profesional"));
    this.app.use(this.paths.experience, require("../routes/experience"));
    this.app.use(this.paths.knoledge, require("../routes/knoledge"));
  }

  listen() {
    this.app.listen(5050, () => {
      console.log(`the app is listening in the port ${5050}`);
    });
  }
}

module.exports = Server;
