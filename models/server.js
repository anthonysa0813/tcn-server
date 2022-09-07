const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.router();
  }

  router() {
    this.app.get("/", (req, res) => {
      res.send("Hello world :D");
    });
  }

  listen() {
    this.app.listen(5050, () => {
      console.log(`the app is listening in the port ${5050}`);
    });
  }
}

module.exports = Server;
