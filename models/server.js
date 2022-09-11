const express = require("express");
const connectDB = require("../db/connectDB");

class Server {
  constructor() {
    this.app = express();
    this.paths = {
      auth: "/api/auth",
      client: "/api/clients",
      employee: "/api/employees",
    };
    this.middleware();
    this.router();
    this.connectMondoDB();
  }

  middleware() {
    this.app.use(express.json());
  }

  connectMondoDB() {
    connectDB();
  }

  router() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.client, require("../routes/clients"));
    this.app.use(this.paths.employee, require("../routes/employee"));
  }

  listen() {
    this.app.listen(5050, () => {
      console.log(`the app is listening in the port ${5050}`);
    });
  }
}

module.exports = Server;
