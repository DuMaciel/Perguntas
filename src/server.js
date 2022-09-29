
const http = require('http')
const path = require("path");

const express = require("express");

const route = require("./route");

const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }))

app.use(route);


server.listen(PORT, () => console.log("RODANDO"));
