const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");
const rollbar = new Rollbar("e752d9d0d9b0426a83a74b354d100be8");

const routes = require("./routes/router");

const app = express();
const port = 3000;

app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/", routes);
app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`ourbackyard listening on port ${port}!`));
