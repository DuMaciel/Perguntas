
const http = require('http')
const path = require("path");

const express = require("express");

const route = require("./route");
const getIO = require('./io')

const app = express();
const server = http.createServer(app);
getIO(server);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.set("view engine", "ejs");

app.use(express.json())
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }))

app.use(route);

server.listen(PORT, HOST, () => console.log(`http://localhost:${PORT}`));

