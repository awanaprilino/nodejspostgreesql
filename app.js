const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hello World</h1>");
});

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});
