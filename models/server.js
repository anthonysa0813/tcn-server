const express = require("express");
const connectDB = require("../db/connectDB");
const fileUpload = require("express-fileupload");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.paths = {
      auth: "/api/auth",
      client: "/api/clients",
      employee: "/api/employees",
      jobs: "/api/jobs",
      services: "/api/services",
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
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.client, require("../routes/clients"));
    this.app.use(this.paths.employee, require("../routes/employee"));
    this.app.use(this.paths.services, require("../routes/services"));
  }

  listen() {
    this.app.listen(5050, () => {
      console.log(`the app is listening in the port ${5050}`);
    });
  }
}

module.exports = Server;
