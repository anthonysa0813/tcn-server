const express = require("express");
const connectDB = require("../db/connectDB");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.PORT = 5050;
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
      upload: "/api/upload",
    };
    this.middleware();
    this.router();
    this.connectMondoDB();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(
      "/curriculums",
      express.static(path.join(__dirname, "../curriculums"))
    );

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
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
    this.app.use(this.paths.upload, require("../routes/upload"));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`the app is listening in the port ${this.PORT}`);
    });
  }
}

module.exports = Server;
